import type { Schema, Struct } from '@strapi/strapi';

export interface GameLanguageAudioLanguage extends Struct.ComponentSchema {
  collectionName: 'components_game_language_audio_languages';
  info: {
    displayName: 'Audio Language';
  };
  attributes: {
    audio: Schema.Attribute.String;
  };
}

export interface GameLanguageInterfaceLanguage extends Struct.ComponentSchema {
  collectionName: 'components_game_language_interface_languages';
  info: {
    displayName: 'Interface Language';
  };
  attributes: {
    interface: Schema.Attribute.String;
  };
}

export interface GameLanguageLanguageSupport extends Struct.ComponentSchema {
  collectionName: 'components_game_language_language_supports';
  info: {
    displayName: 'Language Support';
  };
  attributes: {};
}

export interface GameLanguageSubtitlesLanguage extends Struct.ComponentSchema {
  collectionName: 'components_game_language_subtitles_languages';
  info: {
    displayName: 'Subtitles Language';
  };
  attributes: {
    subtitles: Schema.Attribute.String;
  };
}

export interface GameRequirementsMinimum extends Struct.ComponentSchema {
  collectionName: 'components_game_requirements_minimums';
  info: {
    description: 'Minimum system requirements for a game';
    displayName: 'Minimum Requirement';
  };
  attributes: {
    additional_notes: Schema.Attribute.String;
    graphics: Schema.Attribute.String;
    memory: Schema.Attribute.String;
    os: Schema.Attribute.String;
    processor: Schema.Attribute.String;
    sound: Schema.Attribute.String;
    storage: Schema.Attribute.String;
  };
}

export interface GameRequirementsRecommended extends Struct.ComponentSchema {
  collectionName: 'components_game_requirements_recommendeds';
  info: {
    description: 'Recommended system requirements for a game';
    displayName: 'Recommended Requirement';
  };
  attributes: {
    additional_notes: Schema.Attribute.String;
    graphics: Schema.Attribute.String;
    memory: Schema.Attribute.String;
    os: Schema.Attribute.String;
    processor: Schema.Attribute.String;
    sound: Schema.Attribute.String;
    storage: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO and social sharing settings';
    displayName: 'SEO';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogImage: Schema.Attribute.Media;
  };
}

export interface SlugSeoTagTag extends Struct.ComponentSchema {
  collectionName: 'components_slug_seo_tag_tags';
  info: {
    displayName: 'Tag';
  };
  attributes: {
    gametag_1: Schema.Attribute.String;
    gametag_10: Schema.Attribute.String;
    gametag_2: Schema.Attribute.String;
    gametag_3: Schema.Attribute.String;
    gametag_4: Schema.Attribute.String;
    gametag_5: Schema.Attribute.String;
    gametag_6: Schema.Attribute.String;
    gametag_7: Schema.Attribute.String;
    gametag_8: Schema.Attribute.String;
    gametag_9: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'game-language.audio-language': GameLanguageAudioLanguage;
      'game-language.interface-language': GameLanguageInterfaceLanguage;
      'game-language.language-support': GameLanguageLanguageSupport;
      'game-language.subtitles-language': GameLanguageSubtitlesLanguage;
      'game-requirements.minimum': GameRequirementsMinimum;
      'game-requirements.recommended': GameRequirementsRecommended;
      'shared.seo': SharedSeo;
      'slug-seo-tag.tag': SlugSeoTagTag;
    }
  }
}
