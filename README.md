# treechart

Displays an outline as a tree chart. 

### What the Tree Chart app does

To get started, click this link to run the Tree Chart app in your browser. 

When it opens there will be a chart showing different operating systems, and names of compatible products. 

If you choose a different name from the Charts menu, it will show that chart. 

So that's basically what it does, shows you a tree chart.

### There's an outline behind the chart

I used my Drummer outliner to edit the chart. 

<a href="http://drummer.scripting.com/?url=http://drummer.scripting.com/cluelessnewbie/treechartDemo.opml">Click this link</a> to see the outline in read-only mode in Drummer.

### Make your own outline

Assuming you know the basics of using Drummer, this is how you make an outline for the tree chart app.

0. Think of what you want to make the outline about. Possibly a list of places you've visited or people you know. Favorite sports teams, colors, schools. 

1. Create a new outline using the <i>New</i> command in the File menu. 

2. Make the outline public, noting the URL that's assigned to the outline. You'll need it later.

3. Enter your outline. On the top node in the outline, add a <i>type</i> attribute with the value <i>treechart.</i>

4. With the URL of the outline on the clipboard, enter this URL in the address bar of your browser. Then paste the URL of your outline after the = sigh and press Return. 

5. A tree chart view of your outline should appear. Now when you make changes to the outline, a couple of seconds later the changes will be reflected in the tree chart view. 

### Changing the appearance of your tree chart

You can change the appearance of your tree chart by adding attributes to the topmost node in the outline, the one with the type attribute of treechart. 

For example, if you want the boxes to have a yellow background, you'd add a rectFillColor attribute with the value yellow to the topmost node. 

You can change the font size, style, weight, color, and lots of other things. 

See the list of the attrbiutes below. 

### Attributes that are understood by the Tree Chart app

The attributes with their default values and comments. 

treeRootPosition: "top" //choices are top, left



rectFillColor: "white",

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

textColor: "black",

textPadding: 0,



lineStroke: "black",

lineOpacity: 1,

lineStrokeWidth: 1.2,

lineStrokeDashArray: undefined,

lineArrowHeadSize: 10,

lineArrowPosition: "bottom", //choices are top, bottom

lineColor: "black",



treeWidth: 1100,

treeHeight: 700,

### Notes

1. You can have more than one treechart in an outline. Any headline with a type attribute of treechart is a chart and will appear in the Charts menu in the app.

2. treechart nodes inherit the attributes of their parents, so you can set up defaults in a parent headline, and put some or all of your treechart nodes under that headline, creating a standard style, without having to repeat the styles in each chart. Makes it easy to change a font size, say, for all the charts you have by changing it in one place. 

3. Thanks to Jim Blackler for the wonderful <a href="https://github.com/jimblackler/treefun">treefun</a> package which is what is doing the SVG drawing in this app. 

4. This is intended to be demo code for developers to use to start more complete outline rendering tools. 

