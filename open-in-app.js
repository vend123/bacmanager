// Open a ready workspace straight in BACManager (bacmanager:// link, BACManager 1.9.9 / 1.4.9 or newer).
// Written by tools/web-research/open-in-app.js — edit it there.
(function () {
  var FILES = ["Daikin_iTM_VRV_BACnet.json","Mitsubishi_AE-200_BACnet.json","Daikin_MicroTech_III_Chiller_BACnet.json","Trane_Symbio_700_RTU_BACnet.json","AAON_VCCX2_RTU_BACnet.json","Lennox_CORE_RTU_BACnet.json","Lochinvar_Crest_Boiler_BACnet.json","Belimo_Energy_Valve_BACnet.json","Grundfos_MAGNA3_CIM_BACnet.json","Wilo_Stratos_MAXO_CIF_BACnet.json","ABB_ACH580_Drive_BACnet.json","Schneider_ATV600_Drive_BACnet.json","BASrouter_MSTP_Plant_BACnet.json","BACnet_Priority_Overview.json","AHU_BACnet_MQTT_HomeAssistant.json"];
  var done = {};
  [].forEach.call(document.querySelectorAll('a[download][href$=".json"]'), function (a) {
    var file = (a.getAttribute('href') || '').replace(/^.*\//, '');
    if (FILES.indexOf(file) < 0 || done[file]) return;
    done[file] = 1;
    var b = document.createElement('a');
    b.href = 'bacmanager://open?ws=' + encodeURIComponent(file);
    b.className = a.className;
    b.setAttribute('data-open-ws', file);
    b.textContent = '\u25B6 Open in BACManager';
    b.title = 'Opens this workspace in BACManager 1.4.9 or newer on this PC (asks before replacing yours)';
    if (!a.className) b.style.marginRight = '0.8rem';
    b.addEventListener('click', function () {
      // An older version, or none, does not know the link: nothing opens, or
      // Windows offers to look for an app (which takes the focus, so the focus
      // tells nothing). Unless the page went away, say what the button needs.
      setTimeout(function () {
        if (document.hidden || document.getElementById('oia-note-' + file)) return;
        var n = document.createElement('div');
        n.id = 'oia-note-' + file;
        n.style.cssText = 'font-size:0.85rem;margin:0.5rem 0;color:inherit;opacity:0.85';
        n.innerHTML = 'Nothing opened? This button needs <b>BACManager 1.4.9 or newer</b> on this PC. With an older version, or none, <a href="/#download">download the latest BACManager</a> (it installs over the old one), or download the .json file below and use <i>Open workspace</i>.';
        b.parentNode.insertBefore(n, b.nextSibling && b.nextSibling.nextSibling ? b.nextSibling.nextSibling : null);
      }, 1500);
    });
    a.parentNode.insertBefore(b, a);
    if (a.className) a.parentNode.insertBefore(document.createTextNode(' '), a);
  });
})();
