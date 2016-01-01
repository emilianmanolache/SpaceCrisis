#pragma strict

public var planetPrefab:GameObject;

public var enemyPrefab:GameObject;

public var player:GameObject;

public var planetsToGenerate:int = 20;

public var enemiesToGenerate:int = 10;

function Awake() {

	// randomly spawn planets
	
	var planetsHolder = new GameObject("Planets");
	
	planetsHolder.transform.position = Vector3(planetsHolder.transform.position.x, planetsHolder.transform.position.y, 10);
	
	for (var i = 0; i < planetsToGenerate; i++) {

		var newPlanet = Instantiate(planetPrefab, Vector3(Random.Range(-500,500), Random.Range(-500,500),
		
					0), player.transform.rotation);
		
		newPlanet.transform.parent = planetsHolder.transform;
		
		newPlanet.transform.position = Vector3(newPlanet.transform.position.x, newPlanet.transform.position.y, 10);
		
	}
	
	// randomly spawn enemies
	
	var enemiesHolder = new GameObject("Enemies");
	
	enemiesHolder.transform.position = Vector3(enemiesHolder.transform.position.x, enemiesHolder.transform.position.y, 10);
	
	for (var j = 0; j < enemiesToGenerate; j++) {

		var newEnemy = Instantiate(enemyPrefab, Vector3(Random.Range(-500,500), Random.Range(-500,500),
		
					0), Quaternion.Euler(0.0, 0.0, Random.Range(0.0, 360.0)));
		
		newEnemy.transform.parent = enemiesHolder.transform;
		
		newEnemy.transform.position = Vector3(newEnemy.transform.position.x, newEnemy.transform.position.y, 10);
		
	}
	
}

function Start () {

}

function Update () {

	Camera.main.orthographicSize = Screen.height / 8;	

}