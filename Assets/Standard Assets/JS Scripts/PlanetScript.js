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

    public var internalPlanetType = "regular"; 

    public enum planetTypes {

	    Neutral, Player, Enemy
	
    }

    function Render () {

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
    
        minimapIcon.transform.position		= new Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z - 70);
    
        minimapIcon.transform.localScale	+= Vector3(10, 10, 0);
    
        minimapIcon.transform.parent		= this.transform;
    
        this.minimapIconSpriteRenderer		= minimapIconSpriteRenderer;
    
        this.previousType					= this.planetType;
    
        // add a box collider
	
        gameObject.AddComponent.<BoxCollider>();
	
        var renderer = getRenderer();

        // detect planet type

        if (this.gameObject.tag == 'GasPlanet') {

            internalPlanetType = 'gas';

        }

        var textPositionCorrection = internalPlanetType == "regular" ? 5 : -3;

	    // generate planet text meshes

	    var approachingText 				= new GameObject("Approaching Text");
	
	    approachingText.transform.position	= Vector3(this.transform.position.x, renderer.bounds.min.y - textPositionCorrection, this.transform.position.z);
	
	    approachingText.transform.parent 	= this.transform;
	
	    var orbitingText 					= new GameObject("Orbiting Text");
	
	    orbitingText.transform.position		= Vector3(this.transform.position.x, renderer.bounds.min.y - textPositionCorrection, this.transform.position.z);
	
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
	
        /*var renderer = getRenderer();

	    for (var child:Transform in this.transform) {

            if (child.name == "Approaching Text" || child.name == "Orbiting Text") {

                child.transform.position	= Vector3(this.transform.position.x, renderer.bounds.min.y - 5, this.transform.position.z);

	        }

        }*/

    }

    function setPlanetName(newName:String) {

        GetComponent(TextMesh).text = newName;

    }

    function getRenderer() {

        var renderer = this.GetComponent.<Renderer>() != null ? this.GetComponent.<Renderer>() : null;

        if (renderer == null) {

            for (var child:Transform in this.transform) {

                if ((child.gameObject.GetComponent.<Renderer>() as Renderer) != null) {

                    renderer = child.gameObject.GetComponent.<Renderer>();

                }

            }

        }

        return renderer;

    }

}