var cwin = Titanium.UI.currentWindow;

Ti.include('urllist.js');
var data = getlist();
var bind_data = [];
var len = data.length;
for (var i=0;i<len;i++)
{
    var row = Ti.UI.createTableViewRow();
    var title = Ti.UI.createLabel({
        left:5,
        width:200,
        clickName:'title',
        url:data[i].url_en,
        text:data[i].title
    });
    row.add(title);
    var ja_label = Ti.UI.createLabel({
        right:5,
        width:20,
        clickName:'ja_label',
        url:data[i].url_ja,
        text:"ja"
    });
    if(data[i].url_ja == ""){
        ja_label.text = "";
    }
    row.info = {
        url_ja:data[i].url_ja,
        url_en:data[i].url_en
    };
    row.add(ja_label);
    bind_data.push(row);
}

// create table view
var tableview = Titanium.UI.createTableView({
    data:bind_data
});
cwin.add(tableview);

tableview.addEventListener('click', function(e)
{
    var rowdata = e.rowData;

    var webwin = Ti.UI.createWindow();
    webwin.orientationModes = [
        Titanium.UI.PORTRAIT,
        Titanium.UI.LANDSCAPE_LEFT,
        Titanium.UI.LANDSCAPE_RIGHT
    ];

    var webview_ja = Ti.UI.createWebView();
    webview_ja.url = rowdata.info.url_ja;
    webview_ja.visibled = false;
    webwin.add(webview_ja);
    var button_ja = Titanium.UI.createButton({
        title:"English",
        style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    });
    button_ja.addEventListener('click', show_en);
    var webview_en = Ti.UI.createWebView();
    webview_en.url = rowdata.info.url_en;
    webview_en.visibled = false;
    webwin.add(webview_en);
    var button_en = Titanium.UI.createButton({
        title:"日本語",
        style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    });
    button_en.addEventListener('click', show_ja);

    if(e.source.clickName == 'ja_label'){
        show_ja();
    }else{
        show_en();
    }
    cwin.tab.open(webwin);

    function show_ja (){
        webview_ja.show();
        webview_en.hide();
        webwin.setToolbar([button_ja]);
    }
    function show_en (){
        webview_ja.hide();
        webview_en.show();
        webwin.setToolbar([button_en]);
    }
});

