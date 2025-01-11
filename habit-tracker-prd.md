# Product Requirements Document - Habit Tracker

## Vue d'ensemble
Application web de suivi d'habitudes quotidiennes, conçue pour remplacer un système existant basé sur Google Sheets. L'application permettra aux utilisateurs de suivre différents types d'habitudes et de mesures quotidiennes, avec un système de visualisation par couleur pour indiquer le succès ou l'échec.

## Contexte & Objectifs
- Remplacer un système existant basé sur Google Sheets
- Fournir une interface plus adaptée aux appareils mobiles
- Maintenir la simplicité d'utilisation du système actuel
- Permettre un suivi quotidien facile et visuel

## Spécifications Techniques

### Prérequis
- Node.js : v18.18.0 ou plus récent (v20.x.x recommandé)
- npm : version correspondante à Node.js
- Installation via nvm recommandée :
  ```bash
  # Installation de nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  
  # Installation et utilisation de Node.js
  nvm install 20
  nvm use 20
  ```
- Création et démarrage du projet :
  ```bash
  # Création du projet SvelteKit
  npx sv create habit-tracker

  # Se placer dans le dossier du projet
  cd habit-tracker

  # Installer les dépendances
  npm install

  # Démarrer le projet
  npm run dev -- --open
  ```

### Stack Technique
### Stack Technique
- Frontend: 
  - SvelteKit pour le framework applicatif
  - Skeleton (basé sur Tailwind) pour l'UI
  - TypeScript pour le typage
- Backend: Supabase
- Hébergement: Vercel
- Versionning: GitHub
- Type d'application: Single Page Application (SPA)
- Responsive design: Compatible mobile et desktop

### Configuration Initiale
1. **Création du Projet**
   ```bash
   npx sv create habit-tracker
   ```
   - Template: SvelteKit minimal
   - Type checking: TypeScript
   
2. **Plugins et Outils**
   - prettier : Formatage du code
   - eslint : Linting
   - vitest : Tests unitaires
   - tailwindcss : Framework CSS
   - sveltekit-adapter-vercel : Déploiement Vercel
     - Possibilité de passer à l'adaptateur static plus tard via :
     ```bash
     npm remove @sveltejs/adapter-vercel
     npm install @sveltejs/adapter-static
     ```
     - Mettre à jour svelte.config.js :
     ```js
     import adapter from '@sveltejs/adapter-static';
     ```
   
3. **Plugins Tailwind**
   - typography : Formatage du texte
   - forms : Stylisation des formulaires
   - container-queries : Non installé initialement, pourra être ajouté plus tard si besoin pour des mises en page complexes avec `npm install @tailwindcss/container-queries`

### UI Framework - Skeleton
1. **Composants Utilisés**
   - AppBar/AppShell pour la navigation principale
   - AppRail pour la navigation entre les onglets
   - Cards pour les widgets d'habitudes
   - Buttons pour les toggles et actions
   - Inputs pour les saisies numériques et textuelles

2. **Thème et Personnalisation**
   - Utilisation des thèmes light/dark natifs
   - Couleurs principales :
     - Succès : vert système
     - Échec : rouge système
     - Accent : couleurs par défaut du thème

3. **Responsive Design**
   - Layout fluide basé sur la grille Skeleton
   - Adaptation automatique mobile/desktop
   - Navigation optimisée pour le tactile

### Solution de Persistance
### Supabase
- Base de données PostgreSQL hébergée
- Tier gratuit incluant :
  - 500MB de stockage
  - 50MB de taille de base de données
  - Nombre illimité d'utilisateurs
  - 500K requêtes par mois
- Authentification intégrée
- API REST et temps réel
- Sauvegarde automatique quotidienne

## Types de Données
1. **Habitudes Booléennes**
   - Valeurs possibles: 1 (succès) ou 0/vide (échec)
   - Visualisation: Vert pour succès, Rouge pour échec

2. **Mesures Numériques avec Limites**
   - Exemple: Nombre de cigarettes
   - Paramètres configurables:
     - Limite maximale (ex: 5/jour)
     - Objectif idéal (ex: 2/jour)
   - Visualisation: Vert si ≤ limite, Rouge si > limite

3. **Suivi des Dépenses**
   - Saisie de montants
   - Calcul automatique du total mensuel
   - Catégorisation possible (ex: cigarettes, autres produits nicotine)

## Structure de l'Application

### Navigation Principale
L'application est organisée en trois onglets principaux :

1. **Saisie Quotidienne** (Page par défaut)
   - Affichage des habitudes du jour en cours
   - Interface de saisie rapide via cards/widgets
   - Navigation simple vers les jours précédents
   - Affichage immédiat du statut (vert/rouge)

2. **Reporting**
   - Vue des statistiques et tendances
   - Compteurs de suivi (ex: jours sans alcool)
   - Totaux des dépenses mensuelles
   - Visualisation des performances

3. **Configuration**
   - Gestion des habitudes
     - Nom de l'habitude
     - Type (booléen, numérique, dépense)
     - Paramètres (limites, objectifs)
   - Organisation des widgets

### Navigation Temporelle
- Focus sur le jour en cours par défaut
- Système simple de navigation vers les jours précédents
- Pas de vue multi-jours dans la V1

## Wireframes et Maquettes

### Phase 1 - TodoList
[Insérer screenshot de la vue principale avec les habitudes booléennes]

### Phase 2 - Catégorisation
[Insérer screenshot de la vue avec les catégories]

### Phase 3 - Administration
[Insérer screenshot de l'interface d'administration]

### Phase 4 - Reporting
[Insérer screenshot des vues de reporting]

## Reporting

### Suivi des Dépenses
1. **Vue Mensuelle**
   - Affichage du mois en cours par défaut
   - Deux catégories distinctes :
     - Budget nicorette
     - Budget jeux en ligne
   - Pour chaque catégorie :
     - Total du mois en cours
     - Total du mois précédent pour comparaison
     - Indicateur d'évolution (↑ ou ↓)

2. **Affichage**
   - Cards séparées par catégorie
   - Mise en évidence de l'évolution mois/mois
   - Visualisation simple et directe
   
### Statistiques d'Habitudes

1. **Habitudes Booléennes**
   - Pourcentage de réussite mensuel (ex: "73% de réussite")
   - Nombre de jours réussis sur le total (ex: "22/30 jours")
   - Série actuelle (ex: "5 jours consécutifs")
   - Meilleure série du mois (ex: "Meilleure série : 8 jours")

2. **Valeurs Numériques**
   - Moyenne mensuelle
   - Comparaison avec la limite définie
   - Indicateur visuel :
     - Vert si la moyenne est sous la limite
     - Rouge si la moyenne dépasse la limite
   - Tendance par rapport au mois précédent

3. **Présentation**
   - Cards individuelles par habitude
   - Mise en évidence des séries en cours
   - Code couleur cohérent avec l'interface de saisie

## Contraintes
### Techniques
- Budget limité
- Utilisation de Vercel pour l'hébergement
- Développement en Svelte

### Performances
- Temps de chargement rapide sur mobile
- Réactivité de l'interface

## Phases de Développement

### Phase 1 - TodoList d'Habitudes Catégorisées
- Configuration de Supabase avec tables pour les habitudes et catégories
- Structure de base de l'application
- Vue unique avec liste d'habitudes booléennes
- Habitudes organisées par catégories :
  * Sommeil
  * Santé
  * Travail
  * Vice (incluant Nicotine)
- Toggle simple pour marquer une habitude comme faite/non faite
- Stockage des états quotidiens en base de données
- Navigation temporelle basique (jour par jour)
- Habitudes et catégories codées en dur (JSON ou base de données)

### Phase 2 - Administration
- Interface de configuration des habitudes
- CRUD des habitudes :
  - Création
  - Modification
  - Suppression
  - Réorganisation
- Gestion des libellés et descriptions
- Gestion des catégories

### Phase 3 - Reporting
- Vue dédiée aux statistiques
- Visualisation des tendances
- Suivi des performances par catégorie
- Historique des réalisations

### Phase 4 - Fonctionnalités Avancées
- Types de données additionnels (numériques, dépenses)
- Export des données (CSV/JSON)
- Améliorations UX basées sur l'usage
- Optimisations de performance
- Fonctionnalités additionnelles basées sur le feedback utilisateur