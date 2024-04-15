# Frequently Asked Questions

## General

1. Is the Add-On certified by SAP?
    Yes, #18627

## Installation and de-installation

* Which SAP versions are supported?
    1. SAP S/4 HANA
    2. SAP ECC down to 750

* How can the Installation via SAINT (*.PAT File) or via Transport?
    Installation via SAINT file

* Can the add-on be deinstalled?
    Yes

* Which namespace uses the add-on?
    Namespaces `/UBC/` and `/C09/`

* Can the Add-On be evaluated on a dedicated sandbox system?
    Yes

## Security Details

* Which roles will be defined for the authorization concept? No SAP/3rd-party standard template roles must be used.

    Template roles `/UBC/ADMINISTRATOR` and `/UBC/MONITOR` are delivered and can be copied to customer roles.

* What kind of encryption is used for Data-in-motion?
    SSL

* Will there be integration to any (cloud) system?
S1Seven Stack, by calling REST-Services and MQTT (client) over Websocket, secured by SSL

* Are there any non-personal (functional) user IDs required for the AddOn?
    No

* Does the Add.On processes any strictly confidential data?
    No

* Does the Add.On support SAP Cloud Plattform Integration?
    Yes

## Support

* What is the support model from the manufacturer (Office hours, 24/7)?
    Currently Austrian office hours; an extended SLA is available on request.
