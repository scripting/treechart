# treechart

Displays an outline as a tree chart. 

### Screen shots

Here's an outline, and a tree chart rendering of the outline. 

* <img src="http://scripting.com/images/2022/01/18/outline.png" style="border: 1px solid silver;">

* <img src="http://scripting.com/images/2022/01/18/treechart.png"  style="border: 1px solid silver;">

### What the Tree Chart app does

To get started, <a href="http://treechart.scripting.com/?url=http://drummer.scripting.com/cluelessnewbie/treechartDemo.opml">click this link</a> to run the Tree Chart app in your browser. 

When it opens there will be a chart showing different kinds of computers, organized by the operating systems they run. It's just an example to show how it works.  

If you choose a different name from the Charts menu, it will show that chart. 

So that's basically what it does, shows you a tree chart.

### There's an outline behind the chart

I used Drummer to edit the outline behind the chart. 

<a href="http://drummer.scripting.com/?url=http://drummer.scripting.com/cluelessnewbie/treechartDemo.opml">Click this link</a> to see the outline in read-only mode in Drummer.

### Watch a video

Here's a <a href="https://www.youtube.com/watch?v=-5DAQwL_eNE">video</a> that gives you an idea of how editing a tree chart in Drummer works. 

### Make your own outline

This is how you make an outline to ve viewed as a tree chart.

0. Think of what you want the outline to be about. Possibly a list of places you've visited, people you know, favorite sports teams, performers, schools. 

1. Create a new outline using the <i>New</i> command in the File menu. 

3. Enter your outline. One main head, with several subs, and possibly other subs below the subs. 

4. On the top node in the outline, add a <i>type</i> attribute with the value <i>treechart</i>

2. Make the outline public, noting the URL that's assigned to the outline. You'll need it in the next step.

4. With the URL of the outline on the clipboard, enter <a href="http://treechart.scripting.com/?url=">this URL</a> in the address bar of your browser. Then paste the URL of your outline after the = sigh and press Return. 

5. A tree chart view of your outline should appear. Now when you make changes to the outline, the changes will quickly be reflected in the tree chart view. 

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

2. If you access the treechart app without a url parameter, it will show you the example outline as a tree chart. 

2. treechart nodes inherit the attributes of their parents, so you can set up defaults in a parent headline, and put some or all of your treechart nodes under that headline, creating a standard style, without having to repeat the styles in each chart. Makes it easy to change a font size, say, for all the charts you have by changing it in one place. 

3. Thanks to Jim Blackler for the wonderful <a href="https://github.com/jimblackler/treefun">treefun</a> package which is what is doing the SVG drawing in this app. 

4. This is intended to be demo code for developers to use to start more complete outline rendering tools. 

5. Tree charts were a killer feature in <a href="http://static.userland.com/misc/outliners/images/more11c/treeChart.gif">MORE 1.1c in 1986</a>. The users loved them. Turning an outline into a visual tree chart helps people see the value of outlining in a new way. We liked to say "The C stands for color!," which was, in 1986 a new feature for graphic computers. 

