namespace Everloop {
	using System;
	using UnityEngine;
	using UnityEngine.EventSystems;
	using UnityEngine.UI;

	public class TimeSlider : Slider
	{
	    private AudioSource _sound;
		private bool _isDragging;

	    protected override void Start()
	    {
	        base.Start();

		    _sound = GetComponent<AudioSourceReference>().AudioSource;
	        maxValue = _sound.clip.length;
		}

	    void Update()
	    {
	        if (!Input.GetMouseButton(0) || !_isDragging)
	        {
	            value = _sound.time;
	        }

			if (Input.GetMouseButtonUp(0)) {
				_isDragging = false;
			}
	    }

	    public override void OnDrag(PointerEventData eventData)
	    {
	        _sound.time = Math.Min(value, _sound.clip.length - 1);
			_isDragging = true;
	        base.OnDrag(eventData);
	    }
	}
}
