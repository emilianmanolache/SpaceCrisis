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

    public var deadzone:float = 0;

	function Update () {
	
	
		/** Note original position, to be used with rotation **/
		
	    var origPos = transform.position;
		
		/** end Note original position, to be used with rotation **/
		
		
		/** Move and rotate object **/
		
		var inputX : float = Input.GetAxis("Horizontal");
		
		var inputY : float = Input.GetAxis("Vertical");
 
		var movement:Vector2 = new Vector2(speed.x * inputX, speed.y * inputY);
		
		if (movement.sqrMagnitude >= deadzone || movement.sqrMagnitude == 0) {
		    
		    deadzone = movement.sqrMagnitude > 1500 ? 1500 : movement.sqrMagnitude;

		    GetComponent.<Rigidbody2D>().velocity = movement;

		    if (GetComponent.<Rigidbody2D>().velocity != Vector2.zero) {

		        var dir:Vector2 = GetComponent.<Rigidbody2D>().velocity;

		        var angle:float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;

		        transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);

		    }

		}

		/** end Move object statically **/
		
		
		/** Move camera with player **/
		
		var originalCameraPosition = Camera.main.transform.position;

		Camera.main.transform.position = Vector3(transform.position.x, transform.position.y, (transform.position.z - 10));
		
		Camera.main.transform.position = Vector3(transform.position.x, transform.position.y, (transform.position.z - 10));

		var parallaxCam = GameObject.FindGameObjectsWithTag("ParallaxCam");

		parallaxCam[0].transform.position = Vector3(transform.position.x, transform.position.y, (transform.position.z - 10));

		/** end Move camera with player **/


		/** Basic shooting **/
		
		if (Input.GetButtonDown ("Fire1")) {

		    var moveDirection:Vector3 = transform.position - origPos;

			var shootDirection = moveDirection != Vector3.zero ? moveDirection : -(transform.position - fireOrigin.transform.position);
			 
			var projectile:GameObject = Instantiate(prefab, bulletOrigin.transform.position, gameObject.transform.rotation) as GameObject;
			
			var movingSpeed = Mathf.Abs(inputX) > Mathf.Abs(inputY) ? Mathf.Abs(inputX) : Mathf.Abs(inputY);

			projectile.GetComponent.<Rigidbody2D>().AddForce(projectile.transform.right * projectileSpeed * projectileVelocity);
			
			Destroy(projectile, projectileLifeSpan);
			
		}
		
		/** end Basic shooting **/
		
		
		/** Detect planet proximity **/
		
		var layerMask = 1 << 10;

		var spherePosition = new Vector3(transform.position.x, transform.position.y, 985);

		var approachingPlanetCol:Collider[] = Physics.OverlapSphere(spherePosition, 30, layerMask);
    		
		var orbitingPlanetCol:Collider[] = Physics.OverlapSphere(spherePosition, 20, layerMask);
    	
		var i:int = 0;
		
    	if (orbitingPlanetCol.Length) {
    	    
			hideAllPlanetText();
		
			i = 0;

			while (i < orbitingPlanetCol.Length) {

			    var orbitingPlanet = orbitingPlanetCol[i].gameObject;
    	
			    planetScript = orbitingPlanet.GetComponent(PlanetScript); 
    		
			    planetScript.orbitingText.SetActive(true);

			    i++;

			}
    		
    	}
    	
    	else if (approachingPlanetCol.Length) {

    		hideAllPlanetText();
    		
    		i = 0;

    		while (i < approachingPlanetCol.Length) {

    		    var approachingPlanet = approachingPlanetCol[i].gameObject;
    	
    		    planetScript = approachingPlanet.GetComponent(PlanetScript); 
    		
    		    planetScript.approachingText.SetActive(true);

    		    i++;

    		}

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