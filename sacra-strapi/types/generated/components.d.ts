import type { Schema, Attribute } from '@strapi/strapi';

export interface ObjectsAppearanceChangesDateList extends Schema.Component {
  collectionName: 'components_objects_appearance_changes_date_lists';
  info: {
    displayName: 'appearanceChangesDateList';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    dateList: Attribute.Component<'objects.date-construction-list'> &
      Attribute.Required;
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
    title: Attribute.String & Attribute.Required;
    date: Attribute.Component<'objects.date-construction'> & Attribute.Required;
  };
}

export interface ObjectsConfession extends Schema.Component {
  collectionName: 'components_objects_confessions';
  info: {
    displayName: 'Confession';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    confession: Attribute.Enumeration<
      [
        '\u041F\u0440\u0430\u0432\u043E\u0441\u043B\u0430\u0432\u0438\u0435',
        '\u0411\u0443\u0434\u0434\u0438\u0437\u043C',
        '\u0418\u0441\u043B\u0430\u043C',
        '\u041A\u0430\u0442\u043E\u043B\u0438\u0446\u0438\u0437\u043C',
        '\u041B\u044E\u0442\u0435\u0440\u0430\u043D\u0441\u0442\u0432\u043E',
        '\u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0430\u043D\u0442\u0438\u0437\u043C',
        '\u0418\u0443\u0434\u0430\u0438\u0437\u043C',
        '\u0428\u0430\u043C\u0430\u043D\u0438\u0437\u043C'
      ]
    > &
      Attribute.Required;
  };
}

export interface ObjectsDateConstructionList extends Schema.Component {
  collectionName: 'components_objects_date_construction_lists';
  info: {
    displayName: 'dateConstructionList';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    prefix: Attribute.Enumeration<
      ['\u043A\u043E\u043D.', '\u043D\u0430\u0447.', '\u0441\u0435\u0440.']
    >;
    firstDate: Attribute.Enumeration<
      [
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX',
        'X',
        'XI',
        'XII',
        'XIII',
        'XIV',
        'XV',
        'XVI',
        'XVII',
        'XVIII',
        'XIX',
        'XX',
        'XXI',
        'XXII',
        'XXIII',
        'XXIV',
        'XXV',
        'XXVI',
        'XXVII',
        'XXVIII',
        'XXIX',
        'XXX',
        'XXXI',
        'XXXII',
        'XXXIII',
        'XXXIV',
        'XXXV',
        'XXXVI',
        'XXXVII',
        'XXXVIII',
        'XXXIX',
        'XL'
      ]
    > &
      Attribute.Required;
    secondDate: Attribute.Enumeration<
      [
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX',
        'X',
        'XI',
        'XII',
        'XIII',
        'XIV',
        'XV',
        'XVI',
        'XVII',
        'XVIII',
        'XIX',
        'XX',
        'XXI',
        'XXII',
        'XXIII',
        'XXIV',
        'XXV',
        'XXVI',
        'XXVII',
        'XXVIII',
        'XXIX',
        'XXX',
        'XXXI',
        'XXXII',
        'XXXIII',
        'XXXIV',
        'XXXV',
        'XXXVI',
        'XXXVII',
        'XXXVIII',
        'XXXIX',
        'XL'
      ]
    >;
    postfix: Attribute.Enumeration<
      ['\u0432\u0435\u043A', '\u0432\u0435\u043A\u0430', '\u0432\u0432.']
    > &
      Attribute.Required;
    era: Attribute.Enumeration<
      ['\u043D. \u044D.', '\u0434\u043E \u043D. \u044D.']
    > &
      Attribute.Required;
    secondPrefix: Attribute.Enumeration<
      ['\u043A\u043E\u043D.', '\u043D\u0430\u0447.', '\u0441\u0435\u0440.']
    >;
  };
}

export interface ObjectsDateConstruction extends Schema.Component {
  collectionName: 'components_objects_date_constructions';
  info: {
    displayName: 'dateConstruction';
    icon: 'clock';
  };
  attributes: {
    dateConstruction: Attribute.Date & Attribute.Required;
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

export interface ObjectsRegion extends Schema.Component {
  collectionName: 'components_objects_regions';
  info: {
    displayName: 'region';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    region: Attribute.Enumeration<
      [
        '\u041A\u0440\u0430\u0441\u043D\u043E\u044F\u0440\u0441\u043A\u0438\u0439 \u043A\u0440\u0430\u0439',
        '\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0425\u0430\u043A\u0430\u0441\u0438\u044F',
        '\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0422\u044B\u0432\u0430'
      ]
    > &
      Attribute.Required;
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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'objects.appearance-changes-date-list': ObjectsAppearanceChangesDateList;
      'objects.appearance-changes': ObjectsAppearanceChanges;
      'objects.confession': ObjectsConfession;
      'objects.date-construction-list': ObjectsDateConstructionList;
      'objects.date-construction': ObjectsDateConstruction;
      'objects.geolocation': ObjectsGeolocation;
      'objects.region': ObjectsRegion;
      'objects.sources': ObjectsSources;
    }
  }
}
