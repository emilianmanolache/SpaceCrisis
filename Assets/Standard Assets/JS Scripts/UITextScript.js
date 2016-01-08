#pragma strict

var showMsg = false;

var msgText:String = "";

function OnGUI() {

	if (showMsg) {
		
		var centeredStyle = GUI.skin.GetStyle("Label");
		
		centeredStyle.alignment = TextAnchor.UpperCenter;
		
		centeredStyle.fontSize = 36;
		
		centeredStyle.normal.textColor = Color.white;

    	GUI.Label(Rect(Screen.width/2-400, Screen.height/2-300, 800, 600), msgText, centeredStyle);
    	
    }
    
}

function ShowMessage(msg:String, duration:float) {

	showMsg = true;
	
	msgText = msg;
	
	yield WaitForSeconds (duration);
	
	showMsg = false;
	
}