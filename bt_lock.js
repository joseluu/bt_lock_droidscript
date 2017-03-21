//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a button 1/3 of screen width and 1/4 screen height.
	btn = app.CreateButton( "Connect", 0.4, 0.15 );
	btn.SetOnTouch( btn_doConnect );
	lay.AddChild( btn );
	app.AddLayout( lay );
	
	btn2=app.CreateButton('Open',0.4,0.15);
	btn2.SetOnTouch( btn_doOpen );
	lay.AddChild(btn2);
	app.AddLayout(lay),
	
	btn3=app.CreateButton('Close',0.4,0.15);
	btn3.SetOnTouch( btn_doClose );
	lay.AddChild(btn3);
	app.AddLayout(lay),
	
	//Create Bluetooth serial object.
	bt = app.CreateBluetoothSerial();
	bt.SetOnConnect( bt_OnConnect )
	bt.SetOnReceive( bt_OnReceive );
	bt.SetSplitMode( "End", "\n" );
}

//Called when user touches the button.
function btn_doOpen() 
{
    bt.Write( "open\n" );
}

function btn_doClose() 
{
    bt.Write( "close\n" );
}

//Called when user touches the button.
function btn_doConnect() 
{
    if (bt.IsConnected()) {
	    app.ShowPopup( "Disconnecting from Lock");
	    bt.Disconnect();
    } else {
        bt.Connect( "HC-05" );
    }
}


//Called when we are connected.
function bt_OnConnect( ok )
{
    if( ok ) app.ShowPopup("Connected to lock");
    else app.ShowPopup( "Failed to connect!" );
}

//Called when we get data from device.
function bt_OnReceive( data )
{
    app.ShowPopup( data );
}

