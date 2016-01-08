#pragma strict

public var rightOffset:int;

public var bottomOffset:int;

function Start () {


}

function FixedUpdate () {

	var newPosition:Vector3 = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width - rightOffset, bottomOffset, -11.99));
	
	transform.position = newPosition;
	
}