import type { Schema, Attribute } from '@strapi/strapi';

export interface ObjectsAppearanceChanges extends Schema.Component {
  collectionName: 'components_objects_appearance_changes';
  info: {
    displayName: 'appearanceChanges';
    icon: 'clock';
    description: '';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
  };
}

export interface ObjectsGeolocation extends Schema.Component {
  collectionName: 'components_objects_geolocations';
  info: {
    displayName: 'geolocation';
    icon: 'pinMap';
  };
  attributes: {
    longitude: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: -180;
        max: 180;
      }>;
    latitude: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: -90;
        max: 90;
      }>;
  };
}

export interface ObjectsSources extends Schema.Component {
  collectionName: 'components_objects_sources';
  info: {
    displayName: 'sources';
    icon: 'link';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String;
  };
}

export interface TourPosition extends Schema.Component {
  collectionName: 'components_tour_positions';
  info: {
    displayName: 'position';
    icon: 'pinMap';
  };
  attributes: {
    textureX: Attribute.Integer & Attribute.Required;
    textureY: Attribute.Integer & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'objects.appearance-changes': ObjectsAppearanceChanges;
      'objects.geolocation': ObjectsGeolocation;
      'objects.sources': ObjectsSources;
      'tour.position': TourPosition;
    }
  }
}
