#pragma strict

public class PlanetScript extends MonoBehaviour {

    public var planetName = "";

    public var approachingText:GameObject;

    public var orbitingText:GameObject;

    public var planetNames:String[] = ["Mars", "Neptune", "Jupiter", "Terra", "Uranus", "Moon", "Saturn", "Mercury", "Venus"];

    public var fontFile = "zekton";

    public var fontSize = 38;

    public var approachingTextColor = Color.gray;

    public var orbitingTextColor = Color.white;

    public var planetType:planetTypes;

    public var neutralPlanetIcon:Sprite;

    public var playerPlanetIcon:Sprite;

    public var enemyPlanetIcon:Sprite;

    private var previousType:planetTypes;

    private var minimapIconSpriteRenderer:SpriteRenderer;

    public enum planetTypes {

	    Neutral, Player, Enemy
	
    }

    function Awake () {

	    // set planet name
	
	    var planetNamesCount 				= planetNames.length;
    
        var randomName	 					= planetNames[Random.Range(0, (planetNamesCount - 1))];
    
        this.planetName						= randomName;
    
	    // load and set sprite
    
        /*var planetSprites					= Resources.LoadAll("Sprites/planets");
    
        var planetSpritesCount 				= planetSprites.length;
    
        var randomPlanet 					= Random.Range(1, planetSpritesCount);

	    var spriteRenderer:SpriteRenderer	= gameObject.AddComponent.<SpriteRenderer>() as SpriteRenderer;
    
        spriteRenderer.sprite 				= planetSprites[randomPlanet] as Sprite;*/
    
        // generate minimap icon
    
        var minimapIcon						= new GameObject("Minimap Icon");
    
        var minimapIconSpriteRenderer:SpriteRenderer = minimapIcon.AddComponent.<SpriteRenderer>() as SpriteRenderer;

	    var minimapIconSprite:Sprite		= planetType == 0 ? neutralPlanetIcon : (planetType == 1 ? playerPlanetIcon : enemyPlanetIcon);
	
        minimapIconSpriteRenderer.sprite	= minimapIconSprite;

        minimapIcon.layer					= 15;
    
        minimapIcon.transform.position		= this.transform.position;
    
        minimapIcon.transform.localScale	+= Vector3(10, 10, 0);
    
        minimapIcon.transform.parent		= this.transform;
    
        this.minimapIconSpriteRenderer		= minimapIconSpriteRenderer;
    
        this.previousType					= this.planetType;
    
	    // add a box collider
	
	    gameObject.AddComponent.<BoxCollider2D>();
	
	    // generate planet text meshes

	    var approachingText 				= new GameObject("Approaching Text");
	
	    approachingText.transform.position	= Vector3(this.transform.position.x, this.GetComponent.<Renderer>().bounds.min.y - 5, this.transform.position.z);
	
	    approachingText.transform.parent 	= this.transform;
	
	    var orbitingText 					= new GameObject("Orbiting Text");
	
	    orbitingText.transform.position		= Vector3(this.transform.position.x, this.GetComponent.<Renderer>().bounds.min.y - 5, this.transform.position.z);
	
	    orbitingText.transform.parent 		= this.transform;
	
	    // load custom font
	
	    var importedFont:Font 				= Resources.Load("Fonts/" + fontFile) as Font;
    
	    // add and configure text meshes parameters
	
	    approachingText.AddComponent(TextMesh);
	
	    orbitingText.AddComponent(TextMesh);

	    var approachingMeshRenderer 			= approachingText.GetComponent(MeshRenderer);
	
	    approachingMeshRenderer.material 		= Resources.Load("Fonts/" + fontFile, Material);
		
	    approachingMeshRenderer.material.color 	= approachingTextColor;
	
	    var orbitingMeshRenderer 				= orbitingText.GetComponent(MeshRenderer);
	
	    orbitingMeshRenderer.material 			= Resources.Load("Fonts/" + fontFile, Material);
	
	    orbitingMeshRenderer.material.color		= orbitingTextColor;
	
	    var approachingTextMesh 			= approachingText.GetComponent(TextMesh);
	
	    var orbitingTextMesh 				= orbitingText.GetComponent(TextMesh);
	
	    approachingTextMesh.text 			= "Approaching " 	+ planetName;
	
	    approachingTextMesh.anchor 			= TextAnchor.MiddleCenter;
	
	    approachingTextMesh.alignment 		= TextAlignment.Center;
	
	    approachingTextMesh.characterSize 	= 1;
	
	    approachingTextMesh.fontSize 		= fontSize;
	
	    approachingTextMesh.font 			= importedFont;
	
	    orbitingTextMesh.text 				= "Orbiting " 		+ planetName;
	
	    orbitingTextMesh.anchor 			= TextAnchor.MiddleCenter;
	
	    orbitingTextMesh.alignment 			= TextAlignment.Center;
	
	    orbitingTextMesh.characterSize 		= 1;
	
	    orbitingTextMesh.fontSize 			= fontSize;
	
	    orbitingTextMesh.font 				= importedFont;
	
	    // set proper layer
	
	    approachingText.layer				= 11;
	
	    orbitingText.layer					= 11;
	
	    // deactivate
	
	    approachingText.SetActive(false);
	
	    orbitingText.SetActive(false);
	
	    // bind to script
	
	    this.approachingText 				= approachingText;
	
	    this.orbitingText 					= orbitingText;
	
    }

    function Update () {

    }

    function FixedUpdate() {

	    if (this.planetType != this.previousType) {
	
    	    this.minimapIconSpriteRenderer.sprite	= planetType == 0 ? neutralPlanetIcon : (planetType == 1 ? playerPlanetIcon : enemyPlanetIcon);;
    	
    	    this.previousType = this.planetType;
    	
	    }
	
    }

    function setPlanetName(newName:String) {

        GetComponent(TextMesh).text = newName;

    }

}