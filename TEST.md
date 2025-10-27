# Mini Funnel Mobile — Test Technique (Binôme — 1h)

## Objectif

Implémenter un mini funnel Expo/React Native: Intro -> Highlights -> Auth -> Offres -> Paywall -> Succès. Tout backend est mocké.

## Démarrage

- Ouvrir l'app, onglet Home -> "Open Funnel".
- Styles via NativeWind v2, prop `tw=""`.

## User stories

- Voir une intro claire et démarrer le funnel.
- Parcourir 3 points forts (mock remote config).
- Auth (email optionnel) ou passer.
- Choisir une offre (Mensuel/Annuel) avec badge.
- Paywall: simuler achat (succès/échec via flag), loader, erreur visible.
- Si `isUserSubscribed = true`, sauter Paywall -> Succès.

## Mocks/flags

- `services/remoteConfig.ts` -> `fetchRemoteConfig()` avec:
  - `isUserSubscribed`, `enableTrial`, `highlightItems`, `forcePurchaseFail`.
- `services/offers.ts` -> `getOffers()`.
- `services/auth.ts` -> `login(email)`, `continueAsGuest()`.
- `services/purchase.ts` -> `purchase(offerId, { trial, shouldFail })`.

## Navigation

- Expo Router. Écrans dans `app/(tabs)/funnel-*.tsx`.

## Évaluation (rapide)

- Funnel fonctionnel, feedback d’erreur, UI cohérente via `tw`.
- Code clair, logique fonctionnelle simple, mocks bien isolés.

## Extension (optionnel)

- Skeletons, animation carousel, dark mode peaufiné.
