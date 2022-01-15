const urlOpmlFile = "http://drummer.scripting.com/davewiner/drummer/examples/treeChart1.opml"; 

var treeText, treeNotes;

const defaultAppPrefs = {
	rectFillColor: "#FFFFFF",
	rectStroke: "black",
	rectOpacity: 1,
	rectStrokeWidth: 0.4,
	rectCornerRounding: 5,
	
	textAnchor: "middle",
	textFontFamily: "Ubuntu",
	textFontSize: 14,
	textLineSpacing: 15,
	textFontWeight: "bold", //choices are bold, normal
	textFontStyle: "normal", //choices are normal, italic
	textColor: "#000000",
	textPadding: 0,
	
	lineStroke: "#000000",
	lineOpacity: 1,
	lineStrokeWidth: 1.2,
	lineStrokeDashArray: undefined,
	lineArrowHeadSize: 10,
	lineArrowPosition: "bottom", //choices are top, bottom
	lineColor: "#000000",
	
	treeWidth: 1100,
	treeHeight: 700,
	
	treeRootPosition: "top" //choices are top, left
	}
var appPrefs = undefined;

var flPrefsChanged = false;
function prefsChanged () {
	flPrefsChanged = true;
	}

function buildStylesFromPrefs () {
	var stylestext = "";
	function addStyle (objectname, propertyname, value) {
		stylestext += objectname + "{" + propertyname + ":" + value + "}\n";
		}
	addStyle ("rect", "fill", appPrefs.rectFillColor);
	addStyle ("rect", "stroke", appPrefs.rectStroke);
	addStyle ("rect", "opacity", appPrefs.rectOpacity);
	addStyle ("rect", "stroke-width", appPrefs.rectStrokeWidth);
	
	addStyle ("text", "text-anchor", appPrefs.textAnchor);
	addStyle ("text", "font-family", appPrefs.textFontFamily);
	addStyle ("text", "font-size", appPrefs.textFontSize);
	addStyle ("text", "font-weight", appPrefs.textFontWeight);
	addStyle ("text", "font-style", appPrefs.textFontStyle);
	addStyle ("text", "fill", appPrefs.textColor);
	
	addStyle ("line", "stroke", appPrefs.lineColor);
	addStyle ("line", "opacity", appPrefs.lineOpacity);
	addStyle ("line", "stroke-width", appPrefs.lineStrokeWidth);
	addStyle ("line", "stroke-dasharray", appPrefs.lineStrokeDashArray);
	addStyle ("line", "fill", appPrefs.lineColor);
	
	console.log ("buildStylesFromPrefs: stylestext == " + stylestext);
	
	return (stylestext);
	}
function buildOptionsFromPrefs () {
	var flipXY = 0; //root at top, default
	switch (appPrefs.treeRootPosition) {
		case "top":
			flipXY = 0;
			break;
		case "left":
			flipXY = 1;
			break;
		}
	
	var arrowsUp = 0; //arrows at bottom, default
	switch (appPrefs.lineArrowPosition) {
		case "top":
			arrowsUp = 1;
			break;
		case "bottom":
			arrowsUp = 0;
			break;
		}
	
	var options = {
		flipXY,
		width: appPrefs.treeWidth,
		height: appPrefs.treeHeight,
		labelLineSpacing: appPrefs.textLineSpacing,
		cornerRounding: appPrefs.rectCornerRounding,
		labelPadding: appPrefs.textPadding,
		arrowHeadSize: appPrefs.lineArrowHeadSize,
		arrowsUp,
		siblingGap: 0.1,
		idealSiblingGap: 0.1,
		minimumCousinGap: 0.1,
		idealCousinGap: 1.1,
		levelsGap: 0.9,
		minimumDepth: 7,
		minimumBreadth: 6,
		drawRoot: false
		};
	
	console.log ("buildOptionsFromPrefs: options == " + jsonStringify (options));
	
	return (options);
	}

function setTextColor (newColor) {
	appPrefs.textColor = newColor;
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}
function setFillColor (newColor) {
	appPrefs.rectFillColor = newColor;
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}
function setLineColor (newColor) {
	appPrefs.lineColor = newColor;
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}
function setupColorPickers () {
	$("#idTextColorPicker").colorPicker ({
		pickerDefault: appPrefs.textColor,
		onColorChange: function (id, newValue) {
			setTextColor (newValue);
			}
		});
	$("#idFillColorPicker").colorPicker ({
		pickerDefault: appPrefs.rectFillColor,
		onColorChange: function (id, newValue) {
			setFillColor (newValue);
			}
		});
	$("#idLineColorPicker").colorPicker ({
		pickerDefault: appPrefs.lineColor,
		onColorChange: function (id, newValue) {
			setLineColor (newValue);
			}
		});
	}

function convertToNumber (x, min) {
	var num = Number (x);
	if (num == NaN) {
		num = min;
		}
	if (num < min) {
		num = min;
		}
	return (num);
	}
function fontSizeKeyUp () {
	var x = $("#idFontSize").val ();
	appPrefs.textFontSize = convertToNumber (x, 10);
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}
function lineheightKeyUp () {
	var x = $("#idLineHeight").val ();
	appPrefs.textLineHeight = convertToNumber (x, 10);
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}
function setTreeRootPosition (pos) {
	appPrefs.treeRootPosition = pos;
	
	if (pos == "top") {
		$("#idTreeRootLeft").prop ("checked", false);
		}
	else {
		$("#idTreeRootTop").prop ("checked", false);
		}
	
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}


function setTextStyle () {
	var flBold = getBoolean ($("#idTextStyleBold").prop ("checked"));
	var flItalic = getBoolean ($("#idTextStyleItalic").prop ("checked"));
	
	console.log ("setTextStyle: flBold == " + flBold + ", flItalic == " + flItalic);
	
	appPrefs.textFontWeight = (flBold) ? "bold" : "normal";
	appPrefs.textFontStyle = (flItalic) ? "italic" : "normal";
	
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}
function resetAppPrefs () {
	appPrefs = new Object ();
	for (var x in defaultAppPrefs) {
		appPrefs [x] = defaultAppPrefs [x];
		}
	prefsChanged ();
	viewTree (treeText, treeNotes);
	}

//fonts
	var fontsForMenu = [
		"Copse",
		"Fontdiner Swanky",
		"Montserrat",
		"Open Sans",
		"Oswald",
		"Raleway",
		"Roboto",
		"Ubuntu"
		];
	function setFontMenuName (name) {
		$("#idFontMenuName").text (name);
		}
	function setGoogleFont (name, callback) {
		WebFont.load ({
			google: {
				families: [name]
				},
			fontactive: function (fontFamily, fontDescription) {
				appPrefs.textFontFamily = name;
				setFontMenuName (name);
				prefsChanged ();
				viewTree (treeText, treeNotes);
				if (callback != undefined) {
					callback ();
					}
				}
			});
		}
	function buildFontMenu () {
		for (var i = 0; i <= fontsForMenu.length; i++) {
			var fontName = fontsForMenu [i];
			var liMenuItem = $("<li></li>");
			var menuItemNameLink = $("<a></a>");
			menuItemNameLink.html ("<span class=\"spFontNameInMenu\">" + fontName + "</span>");
			menuItemNameLink.click (function (ev) {
				var thisfont = $(this).text ();
				setGoogleFont (thisfont);
				});
			liMenuItem.append (menuItemNameLink);
			$("#idFontMenu").append (liMenuItem);
			}
		setFontMenuName (appPrefs.textFontFamily);
		}
//height, width
	
	function treeHeightKeyUp () {
		var x = $("#idTreeHeight").val ();
		appPrefs.treeHeight = convertToNumber (x, 100);
		prefsChanged ();
		viewTree (treeText, treeNotes);
		}
	function treeWidthKeyUp () {
		var x = $("#idTreeWidth").val ();
		appPrefs.treeWidth = convertToNumber (x, 100);
		prefsChanged ();
		viewTree (treeText, treeNotes);
		}
function initSidebarItems () {
	$("#idFontSize").val (appPrefs.textFontSize);
	$("#idLineHeight").val (appPrefs.textLineSpacing);
	$("#idTreeHeight").val (appPrefs.treeHeight);
	$("#idTreeWidth").val (appPrefs.treeWidth);
	
	$("#idTreeRootLeft").prop ("checked", appPrefs.treeRootPosition == "left");
	$("#idTreeRootTop").prop ("checked", appPrefs.treeRootPosition == "top");
	
	$("#idTextStyleBold").prop ("checked", appPrefs.textFontWeight == "bold");
	$("#idTextStyleItalic").prop ("checked", appPrefs.textFontStyle == "italic");
	
	setupColorPickers ();
	buildFontMenu ();
	setGoogleFont (appPrefs.textFontFamily, function () { 
		});
	}

function getTreeChartPackage (theOutline) {
	var treeText = "", notesText = "", stylesText = "", optionsText = "";
	function addlevel (subs, level) {
		function getSubtree (node, level=0) {
			var mytext = "";
			if (node.subs !== undefined) {
				node.subs.forEach (function (subnode) {
					mytext += filledString ("\t", level) + subnode.text + "\n";
					mytext += getSubtree (subnode, level + 1);
					});
				return (mytext);
				}
			else {
				return ("");
				}
			}
		subs.forEach (function (item) {
			if (getBoolean (item.isComment)) {
				}
			else {
				if ((level == 0) && beginsWith (item.text, "#")) {
					var key = stringLower (stringDelete (item.text, 1, 1));
					switch (key) {
						case "notes":
							notesText = getSubtree (item);
							break;
						case "options":
							optionsText = getSubtree (item);
							break;
						case "styles":
							stylesText = getSubtree (item);
							break;
						}
					}
				else {
					treeText += filledString ("\t", level) + item.text + "\n";
					if (item.subs !== undefined) {
						addlevel (item.subs, level + 1);
						}
					}
				}
			});
		}
	addlevel (theOutline.opml.body.subs, 0);
	
	function undefinedIfEmpty (val) {
		val = (trimWhitespace (val) == "") ? undefined : val;
		return (val);
		}
	
	var package = {
		treeText,
		notesText: undefinedIfEmpty (notesText),
		optionsText: undefinedIfEmpty (optionsText),
		stylesText: undefinedIfEmpty (stylesText)
		};
	
	return (package)
	}
function readTreeOutline (callback) {
	const options = {
		flSubscribe: true
		};
	opml.read (urlOpmlFile, options, function (err, theOutline) {
		if (!err) {
			var package = getTreeChartPackage (theOutline);
			
			treeText = package.treeText;
			treeNotes = package.notesText;
			
			
			console.log ("readTreeOutline: treeText == \n" + treeText);
			console.log ("readTreeOutline: treeNotes == \n" + treeNotes);
			
			callback (treeText, treeNotes);
			}
		});
	}
function viewTree (treeText, treeNotes) {
	function clear (node) {
		while (node.childNodes.length > 0)
			node.removeChild (node.childNodes [0]);
		}
	function demo(data) {
		var treeEntry = new Object ();
		var options = new Object ();
		var styles = new Object ();
		function draw() {
			var tree = textToTree(treeEntry.value);
			var diagramGroup = document.getElementById("diagramGroup");
			var styleSheet = document.getElementById("stylesheet");
			clear(styleSheet);
			styleSheet.appendChild(document.createTextNode(styles.value));
			clear(diagramGroup);
			treeToDiagram(tree, diagramSvg, diagramGroup, JSON.parse(options.value));
			}
		treeEntry.value = data.tree;
		options.value = JSON.stringify(data.options, null, " ");
		styles.value =  data.styles;
		draw();
		}
	demo ({
		tree: treeText,
		options: buildOptionsFromPrefs (),
		styles: buildStylesFromPrefs ()
		} );
	$("#idNotes").html (treeNotes);
	}



function everySecond () {
	if (flPrefsChanged) {
		flPrefsChanged = false;
		localStorage.treeChartPrefs = jsonStringify (appPrefs);
		}
	}
function startup () {
	var flStartingUp = true; 
	console.log ("startup");
	
	appPrefs = new Object ();
	for (var x in defaultAppPrefs) {
		appPrefs [x] = defaultAppPrefs [x];
		}
	
	if (localStorage.treeChartPrefs !== undefined) {
		try {
			var jstruct = JSON.parse (localStorage.treeChartPrefs);
			for (var x in jstruct) {
				appPrefs [x] = jstruct [x];
				}
			}
		catch (err) {
			}
		}
	readTreeOutline (function (theText, theNotes) {
		treeText = theText; //set global
		treeNotes = theNotes; //set global
		if (flStartingUp) {
			initSidebarItems ();
			}
		flStartingUp = false;
		viewTree (treeText, treeNotes);
		self.setInterval (everySecond, 1000);
		});
	}
