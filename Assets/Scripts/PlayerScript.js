#pragma strict

public class PlayerScript extends MonoBehaviour {
	
	
	public var speed : Vector2 = new Vector2(100, 100);

	public var prefab:GameObject;
	
	public var bulletOrigin:GameObject;
	
	public var fireOrigin:GameObject;
	
	public var projectileSpeed:float = 3000f;
	
	public var projectileLifeSpan:float = 10f;
	
	public var planetScript:PlanetScript;
	
	public var parallaxSpace:GameObject;
	
    public var projectileVelocity:int = 1;

	function Update () {
	
	
		/** Note original position, to be used with rotation **/
		
		var origPos = transform.position;
		
		/** end Note original position, to be used with rotation **/
		
		
		/** Move object statically **/
		
		var inputX : float = Input.GetAxis("Horizontal");
		
		var inputY : float = Input.GetAxis("Vertical");
		
		var movement : Vector3 = new Vector3(speed.x * inputX, speed.y * inputY, 0);
		
		movement *= Time.deltaTime;
		
		transform.Translate(movement, Space.World);
		
		/** end Move object statically **/
		
		
		/** Move camera with player **/
		
		Camera.main.transform.position = Vector3(transform.position.x, transform.position.y, (transform.position.z - 10));
		
		//parallaxSpace.transform.position = Vector3((Camera.main.transform.position.x / 10), (Camera.main.transform.position.y / 10), (Camera.main.transform.position.z - 30));
		
		/** end Move camera with player **/
		
		
		/** Rotate sprite to face moving direction **/
		
		var moveDirection:Vector3 = transform.position - origPos;
		
		if (moveDirection != Vector3.zero) {
		
			var angle:float = Mathf.Atan2(moveDirection.y, moveDirection.x) * Mathf.Rad2Deg;
			
			transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);
			
		}
		
		/** end Rotate sprite to face moving direction **/


		/** Basic shooting **/
		
		if (Input.GetButtonDown ("Fire1")) {

			var shootDirection = moveDirection != Vector3.zero ? moveDirection : -(transform.position - fireOrigin.transform.position);

			var q:Quaternion = Quaternion.FromToRotation(Vector3.forward, shootDirection);
			 
			var projectile:GameObject = Instantiate(prefab, bulletOrigin.transform.position, gameObject.transform.rotation) as GameObject;
			
			var movingSpeed = Mathf.Abs(inputX) > Mathf.Abs(inputY) ? Mathf.Abs(inputX) : Mathf.Abs(inputY);

			projectile.GetComponent.<Rigidbody2D>().AddForce(projectile.transform.right * projectileSpeed * projectileVelocity);
			
			Destroy(projectile, projectileLifeSpan);
			
		}
		
		/** end Basic shooting **/
		
		
		/** Detect planet proximity **/
		
		var layerMask = 1 << 10;
		
		var approachingPlanetCol = Physics2D.OverlapCircle(transform.position, 20, layerMask);
    		
    	var orbitingPlanetCol = Physics2D.OverlapCircle(transform.position, 5, layerMask);
    	
    	if (orbitingPlanetCol) {
			
			hideAllPlanetText();
			
    		var orbitingPlanet = orbitingPlanetCol.gameObject;
    	
    		planetScript = orbitingPlanet.GetComponent(PlanetScript); 
    		
     		planetScript.orbitingText.SetActive(true);
    		
    	}
    	
    	else if (approachingPlanetCol) {
    		
    		hideAllPlanetText();
    		
    		var approachingPlanet = approachingPlanetCol.gameObject;
    	
    		planetScript = approachingPlanet.GetComponent(PlanetScript); 
    		
     		planetScript.approachingText.SetActive(true);
    		
    	}
    	
    	else {
    	
    		hideAllPlanetText();
    		
    	}
    	
    	/** end Detect planet proximity **/
    	
    	
    }
	
	function hideAllPlanetText() {
	
		var planetTextLayer = FindGameObjectsWithLayer(11);
    		
    	if (planetTextLayer && planetTextLayer.length > 0) {
    	
			for (var planetText in planetTextLayer) {
			
				if (planetText) {
				
					planetText.SetActive(false);
				
				}
				
			}
    		
    	}
    	
	}
	
	function FindGameObjectsWithLayer (layer : int) : GameObject[] {
	
	    var goArray = FindObjectsOfType(GameObject);
	    
	    var goList = new System.Collections.Generic.List.<GameObject>();
	    
	    for (var i = 0; i < goArray.Length; i++) {
	    
		    if (goArray[i].layer == layer) {
		    
		    	goList.Add(goArray[i]);
		    	
		    }
		    
	    }
	    
	    if (goList.Count == 0) {
	    
	    	return null;
	    	
	    }
	    
	    return goList.ToArray();
	    
    }
    
}