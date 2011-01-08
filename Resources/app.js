// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({
    url:'lists.js',
    titleImage:'images/appcelerator_small.png'
});

var tab1 = Titanium.UI.createTab({
    icon:'images/tabs/KS_nav_views.png',
    title:'Base UI',
    window:win1
});

//
//  add tabs
//
tabGroup.addTab(tab1);  

// open tab group
tabGroup.open();

