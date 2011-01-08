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
    var w = Ti.UI.createWindow();
    w.orientationModes = [
        Titanium.UI.PORTRAIT,
        Titanium.UI.LANDSCAPE_LEFT,
        Titanium.UI.LANDSCAPE_RIGHT
    ];

    var info_ja = {
        url:rowdata.info.url_ja,
        button_title:"English"
    };
    var info_en = {
        url:rowdata.info.url_en,
        button_title:"日本語"
    };
    var webview = Ti.UI.createWebView();
    if(e.source.clickName == 'ja_label'){
        webview.current_info = info_ja;
        webview.next_info    = info_en;
    }else{
        webview.current_info = info_en;
        webview.next_info    = info_ja;
    }
    webview.url = webview.current_info.url;
    w.add(webview);

    var button = Titanium.UI.createButton({
        title:webview.current_info.button_title,
        style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    });
    if(rowdata.info.url_ja == ""){
        button.enabled = false;
    }
    button.addEventListener('click', function() {
        button.title = webview.next_info.button_title;
        webview.url   = webview.next_info.url;
        var _tmp = webview.current_info;
        webview.current_info  = webview.next_info;
        webview.next_info  = _tmp;
    });
    w.setToolbar([button]);
    cwin.tab.open(w);
});

