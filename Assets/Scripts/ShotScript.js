#pragma strict

public var explosionObject:GameObject;

public var explosionSound:AudioClip;

private var uiScript:UITextScript;

public var bulletLifetime:float = 0.5;

public class ShotScript extends MonoBehaviour {
	
	public var damage : int = 1;
	
	public var isEnemyShot : boolean = false;
	
	function Start () {
	    
	    Destroy(gameObject, bulletLifetime);

	}
	
	public function OnTriggerEnter2D(hitObject:Collider2D) {
	
		if (hitObject.tag == 'Enemy') {
		
			// get explosion animation
			
		    var explosion = Instantiate(explosionObject, hitObject.transform.position, Quaternion.identity);
		
			// play explosion sound
			
			AudioSource.PlayClipAtPoint(explosionSound, hitObject.transform.position);
			
			// destroy bullet, enemy and explosion
			
			Destroy(hitObject.gameObject);
			
			Destroy(gameObject); // destroy the grenade
		
			Destroy(explosion, 5); // delete the explosion after 3 seconds
		
			// get remaining enemies
			
			var enemies:GameObject[];
			
			enemies = GameObject.FindGameObjectsWithTag("Enemy");
			
			Debug.Log('Remaining enemies: ' + enemies.length);
			
			if (enemies.length == 1) {
			
				Debug.Log('All enemies killed!');
			
				var uiScriptsObject = GameObject.Find("UI Scripts"); 
				
				uiScriptsObject.GetComponent(UITextScript).ShowMessage("Congratulations! You have killed all the enemies!", 30);
			
			}
			
		}
		
	}

}