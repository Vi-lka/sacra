import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentFile extends Schema.Component {
  collectionName: 'components_content_files';
  info: {
    displayName: 'File';
    icon: 'attachment';
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    file: Attribute.Media & Attribute.Required;
  };
}

export interface ContentRichText extends Schema.Component {
  collectionName: 'components_content_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'medium';
    description: '';
  };
  attributes: {
    text: Attribute.RichText & Attribute.Required;
  };
}

export interface ContentSlider extends Schema.Component {
  collectionName: 'components_content_sliders';
  info: {
    displayName: 'Slider';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    images: Attribute.Media & Attribute.Required;
  };
}

export interface ContentUrl extends Schema.Component {
  collectionName: 'components_content_urls';
  info: {
    displayName: 'Url';
    icon: 'link';
    description: '';
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    url: Attribute.Text & Attribute.Required;
  };
}

export interface ContentVideoFile extends Schema.Component {
  collectionName: 'components_content_video_files';
  info: {
    displayName: 'VideoFile';
    icon: 'slideshow';
    description: '';
  };
  attributes: {
    file: Attribute.Media & Attribute.Required;
  };
}

export interface ContentVideo extends Schema.Component {
  collectionName: 'components_content_videos';
  info: {
    displayName: 'VideoEmbed';
    icon: 'cast';
    description: '';
  };
  attributes: {
    embeded: Attribute.Text & Attribute.Required;
  };
}

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
      'content.file': ContentFile;
      'content.rich-text': ContentRichText;
      'content.slider': ContentSlider;
      'content.url': ContentUrl;
      'content.video-file': ContentVideoFile;
      'content.video': ContentVideo;
      'objects.appearance-changes': ObjectsAppearanceChanges;
      'objects.geolocation': ObjectsGeolocation;
      'objects.sources': ObjectsSources;
      'tour.position': TourPosition;
    }
  }
}
