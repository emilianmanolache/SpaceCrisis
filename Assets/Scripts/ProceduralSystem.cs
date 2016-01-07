using UnityEngine;
using System.Collections.Generic;

// This component will make a basic star system based on a bunch of preset materials, textures, and random values
[AddComponentMenu("Procedural System")]
public class ProceduralSystem : MonoBehaviour
{
	public Mesh SphereMesh;

	public List<Material> PlanetMaterials = new List<Material>();

	public List<Material> MoonMaterials = new List<Material>();

	public List<Object> GeneratedObjects = new List<Object>();


    public List<GameObject> planetPrefabs = new List<GameObject>();

    public List<GameObject> starPrefabs = new List<GameObject>();

    public GameObject starLightNormalPlanetPrefab;

    public GameObject starLightGasPlanetPrefab;

    public GameObject newStarNormalLight;

    public GameObject newStarGasLight;

    public void Clear()
	{
		for (var i = GeneratedObjects.Count - 1; i >= 0; i--)
		{
			SgtHelper.Destroy(GeneratedObjects[i]);
		}

		GeneratedObjects.Clear();
	}

	public void AddStar()
	{
        if (starPrefabs.Count == 0) return;
        var solarSystem = GameObject.FindGameObjectsWithTag("SolarSystem")[0];
        var placeholder   = AddBasicGameObject("Star", transform, 0.0f, 0.0f, 0.0f, 10.0f, 3.0f, 3.0f);
        var newStar = (GameObject) Instantiate(starPrefabs[Random.Range(0, (starPrefabs.Count - 1))], new Vector3(0.0f, 0.0f, 0.0f), placeholder.transform.rotation);
        
        newStar.transform.parent = solarSystem.transform;
        newStar.transform.localScale = placeholder.transform.localScale;
        newStar.transform.localPosition = new Vector3(0.0f, -5.0f, 0.0f);

        newStarNormalLight = (GameObject)Instantiate(starLightNormalPlanetPrefab, new Vector3(0.0f, 0.0f, 0.0f), placeholder.transform.rotation);
        newStarNormalLight.transform.parent = solarSystem.transform;
        newStarNormalLight.transform.localPosition = new Vector3(0.0f, -20.0f, 0.0f);

        newStarGasLight = (GameObject)Instantiate(starLightGasPlanetPrefab, new Vector3(0.0f, 0.0f, 0.0f), placeholder.transform.rotation);
        newStarGasLight.transform.parent = solarSystem.transform;
        newStarGasLight.transform.localPosition = new Vector3(0.0f, -20.0f, 0.0f);

        Destroy(placeholder);

    }

	public void AddPlanet()
	{
        if (planetPrefabs.Count == 0) return;

        // place planet
        var solarSystem = GameObject.FindGameObjectsWithTag("SolarSystem")[0];
        var placeholder = AddBasicGameObject("Planet", transform, 15.0f, 30.0f, -3.0f, 3.0f, 0.5f, 1.0f);
        var newPlanet = (GameObject)Instantiate(planetPrefabs[Random.Range(0, (planetPrefabs.Count - 1))], new Vector3(0.0f, 0.0f, 0.0f), placeholder.transform.rotation);

        // position within star system
        newPlanet.transform.parent = solarSystem.transform;
        newPlanet.transform.localScale = placeholder.transform.localScale;
        newPlanet.transform.localPosition = new Vector3(0.0f, -5.0f, 0.0f);

        // fix orbit and rotation
        var simpleOrbit = newPlanet.AddComponent<SimpleOrbit>();
        var rotate = newPlanet.AddComponent<SgtRotate>();
        simpleOrbit.Angle = placeholder.GetComponent<SimpleOrbit>().Angle;
        simpleOrbit.Radius = placeholder.GetComponent<SimpleOrbit>().Radius;
        simpleOrbit.Center = new Vector3(placeholder.GetComponent<SimpleOrbit>().Center.x, placeholder.GetComponent<SimpleOrbit>().Center.y - 3, placeholder.GetComponent<SimpleOrbit>().Center.z);
        simpleOrbit.DegreesPerSecond = placeholder.GetComponent<SimpleOrbit>().DegreesPerSecond;
        rotate.DegreesPerSecond = placeholder.GetComponent<SgtRotate>().DegreesPerSecond;

        // add atmosphere lights
        if ((newPlanet.GetComponent<SgtAtmosphere>() as SgtAtmosphere) != null)
        {
            newPlanet.GetComponent<SgtAtmosphere>().Lights[0] = newStarGasLight.GetComponent<Light>();
        }

        // add cloudsphere lights
        if ((newPlanet.GetComponent<SgtCloudsphere>() as SgtCloudsphere) != null)
        {
            newPlanet.GetComponent<SgtCloudsphere>().Lights[0] = newStarGasLight.GetComponent<Light>();
        }

        // add jovian lights
        if ((newPlanet.GetComponent<SgtJovian>() as SgtJovian) != null)
        {
            newPlanet.GetComponent<SgtJovian>().Lights[0] = newStarGasLight.GetComponent<Light>();
        }
        else
        {
            foreach (Transform child in newPlanet.transform)
            {
                if ((child.gameObject.GetComponent<SgtJovian>() as SgtJovian) != null)
                {
                    child.gameObject.GetComponent<SgtJovian>().Lights[0] = newStarGasLight.GetComponent<Light>();
                }
            }
        }

        // add ring lights
        foreach (Transform child in newPlanet.transform)
        {
            if ((child.gameObject.GetComponent<SgtRing>() as SgtRing) != null)
            {
                child.gameObject.GetComponent<SgtRing>().Lights[0] = newStarNormalLight.GetComponent<Light>();
            }
        }

        Destroy(placeholder);

        // Add moons?
        /*for (var i = Random.Range(0, 2); i >= 0; i--)
		{
			AddMoon(gameObject.transform);
		}*/
    }

    public void AddMoon(Transform parent)
	{
		var gameObject   = AddBasicGameObject("Moon", parent, 1.0f, 3.0f, -30.0f, 30.0f, 0.05f, 0.2f);
		var meshFilter   = gameObject.AddComponent<MeshFilter>();
		var meshRenderer = gameObject.AddComponent<MeshRenderer>();

		meshFilter.sharedMesh = SphereMesh;

		meshRenderer.sharedMaterial = GetRandomElement(MoonMaterials);
	}
    
	public GameObject AddBasicGameObject(string name, Transform parent, float minOrbitDistance, float maxOrbitDistance, float minRotationSpeed, float maxRotationSpeed, float minScale, float maxScale)
	{
		// Create GO
		var gameObject  = new GameObject(name);
		var simpleOrbit = gameObject.AddComponent<SimpleOrbit>();
		var rotate      = gameObject.AddComponent<SgtRotate>();
		var scale       = Random.Range(maxScale, maxScale);

		gameObject.transform.parent = parent;

		gameObject.transform.localScale = new Vector3(scale, scale, scale);

		// Setup orbit
		simpleOrbit.Angle = Random.Range(0.0f, 360.0f);

		simpleOrbit.Radius = Random.Range(minOrbitDistance, maxOrbitDistance);

		simpleOrbit.DegreesPerSecond = Random.Range(minRotationSpeed, maxRotationSpeed);

		// Setup rotation
		rotate.DegreesPerSecond = new Vector3(0.0f, Random.Range(minRotationSpeed, maxRotationSpeed), 0.0f);

		// Add to list and return
		GeneratedObjects.Add(gameObject);

		return gameObject;
	}

	protected virtual void Awake()
	{
		Clear();

		if (SphereMesh != null)
		{
			AddStar();

			for (var i = Random.Range(1, 12); i >= 0; i--)
			{
				AddPlanet();
			}
		}
	}

	private T GetRandomElement<T>(List<T> list)
	{
		if (list != null && list.Count > 0)
		{
			var index = Random.Range(0, list.Count - 1);

			return list[index];
		}

		return default(T);
	}
}
