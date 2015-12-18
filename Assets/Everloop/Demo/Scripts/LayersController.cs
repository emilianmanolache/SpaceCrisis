namespace Everloop {
	using UnityEngine;
	using System.Collections.Generic;
	using System.Linq;

	public class LayersController : MonoBehaviour
	{
	    public AudioSource[] Layers;
		public double RandomizeProbablility;

	    private readonly List<AudioSource> _muted = new List<AudioSource>();

	    public void Solo(bool enabled)
	    {
	        if (enabled)
	        {
	            foreach (AudioSource audio in Layers)
	            {
	                if (audio.isPlaying)
	                {
	                    audio.mute = true;
	                    _muted.Add(audio);
	                }
	            }
	        }
	        else
	        {
	            foreach (AudioSource audio in _muted)
	            {
	                audio.mute = false;
	            }
	            _muted.Clear();
	        }
	    }

	    public void PlayStopAll()
	    {
	        bool anyNotPlaying = Layers.Any(audio => !audio.isPlaying);
	        if (anyNotPlaying)
	        {
	            foreach (AudioSource audio in Layers)
	            {
	                audio.Play();
	                audio.mute = false;
	            }
	        }
	        else
	        {
	            foreach (AudioSource audio in Layers)
	            {
	                audio.Stop();
	                audio.mute = false;
	            }
	        }
	    }

		public void Randomize()
		{
			foreach (AudioSource audio in Layers)
			{
				audio.Stop();
				audio.mute = false;

				if (Random.value < RandomizeProbablility)
				{
					audio.Play();
					audio.time = Random.Range(0, audio.clip.length - 1);
				}
			}
		}
	}
}
