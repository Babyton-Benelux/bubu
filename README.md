# BuBu – Babyton Benelux

Poets-, weer- en tandjesapp voor ouders, van Babyton Benelux.

## Online zetten met GitHub Pages
1. Zet alle bestanden van deze map in de repository (index.html, map img/, dit bestand).
2. Ga in de repository naar Settings > Pages.
3. Kies bij "Source": Deploy from a branch, branch `main`, map `/ (root)`, en sla op.
4. Na een minuut staat de app op het adres dat GitHub toont.
5. Eigen domein: vul bij "Custom domain" bv. `bubu.babyton.be` in en maak bij je DNS-beheerder een CNAME-record `bubu` naar `<jouw-account>.github.io`.

## Snel aanpassen
- YouTube-kanalen: zoek in index.html naar `const YT=`.
- Google Analytics-ID: zoek naar `const GA_ID=`.
- Shoplinks: zoek naar `const SHOP=`.
- Teksten NL/FR: zoek naar `const T={`.
