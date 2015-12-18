namespace Everloop {
	using UnityEngine;

	[RequireComponent(typeof(AudioSource))]
	public class UnmuteController : MonoBehaviour
	{
	    public void Unmute(bool enabled)
	    {
	        if (enabled)
	        {
	            AudioSource audio = GetComponent<AudioSource>();
	            audio.mute = false;
	        }
	    }
	}
}
