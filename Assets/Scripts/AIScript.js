#pragma strict

public class AIScript extends MonoBehaviour {
	
	public var speed : Vector2 = new Vector2(10, 10);
	
	public var direction : Vector2 = new Vector2(-1, 0);
	
	public var currentAIState:aiState = 0;
	
	public enum aiState {

		Patrol, Attack, Retreat
		
	}

	function Update () {
	
		if (this.currentAIState == 0) {
		
			var movement : Vector3 = new Vector3(speed.x * direction.x, speed.y * direction.y, 0);
			
			movement *= Time.deltaTime;
			
			transform.Translate(movement);

		}
		
		if (this.currentAIState == 1) {
		}
		
	}
	
}