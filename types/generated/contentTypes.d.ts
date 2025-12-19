import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminAuditLog extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_audit_logs';
  info: {
    displayName: 'Audit Log';
    pluralName: 'audit-logs';
    singularName: 'audit-log';
  };
  options: {
    draftAndPublish: false;
    timestamps: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::audit-log'> &
      Schema.Attribute.Private;
    payload: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<'oneToOne', 'admin::user'>;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiBinanceGiftCardBinanceGiftCard
  extends Struct.CollectionTypeSchema {
  collectionName: 'binance_gift_cards';
  info: {
    displayName: 'Binance Gift Card';
    pluralName: 'binance-gift-cards';
    singularName: 'binance-gift-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::binance-gift-card.binance-gift-card'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiCategoryBannerCategoryBanner
  extends Struct.CollectionTypeSchema {
  collectionName: 'category_banners';
  info: {
    displayName: 'Category Banner';
    pluralName: 'category-banners';
    singularName: 'category-banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    desktopImage: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::category-banner.category-banner'
    > &
      Schema.Attribute.Private;
    mobileImage: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Struct.CollectionTypeSchema {
  collectionName: 'categories';
  info: {
    displayName: 'Category';
    pluralName: 'categories';
    singularName: 'category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Unique;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCheckoutCheckout extends Struct.CollectionTypeSchema {
  collectionName: 'checkouts';
  info: {
    displayName: 'Checkout';
    pluralName: 'checkouts';
    singularName: 'checkout';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::checkout.checkout'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGameBannerGameBanner extends Struct.CollectionTypeSchema {
  collectionName: 'game_banners';
  info: {
    displayName: 'GameBanner';
    pluralName: 'game-banners';
    singularName: 'game-banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::game-banner.game-banner'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGameKeyGameKey extends Struct.CollectionTypeSchema {
  collectionName: 'game_keys';
  info: {
    description: 'Stores individual game activation keys';
    displayName: 'Game Key';
    pluralName: 'game-keys';
    singularName: 'game-key';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignedAt: Schema.Attribute.DateTime;
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isAvailable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::game-key.game-key'
    > &
      Schema.Attribute.Private;
    product: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGiftCardVariationGiftCardVariation
  extends Struct.CollectionTypeSchema {
  collectionName: 'gift_card_variations';
  info: {
    displayName: 'Gift Card Variation';
    pluralName: 'gift-card-variations';
    singularName: 'gift-card-variation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Available: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    discountPrice: Schema.Attribute.Integer;
    editiondescription: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gift-card-variation.gift-card-variation'
    > &
      Schema.Attribute.Private;
    price: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United States',
        'Global',
        'Russia',
        'United Kingdom',
        'China',
        'Row (Rest of World)',
        'Latin America',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    stock_status: Schema.Attribute.Enumeration<['Available', 'Sold Out']> &
      Schema.Attribute.DefaultTo<'Available'>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_name: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiGiftCardGiftCard extends Struct.CollectionTypeSchema {
  collectionName: 'gift_cards';
  info: {
    displayName: 'Gift Card';
    pluralName: 'gift-cards';
    singularName: 'gift-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gift-card.gift-card'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::gift-card.gift-card'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiHeroBannerHeroBanner extends Struct.CollectionTypeSchema {
  collectionName: 'hero_banners';
  info: {
    displayName: 'Hero Banner';
    pluralName: 'hero-banners';
    singularName: 'hero-banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::hero-banner.hero-banner'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsletterSubscriberNewsletterSubscriber
  extends Struct.CollectionTypeSchema {
  collectionName: 'newsletter_subscribers';
  info: {
    displayName: 'Newsletter Subscriber';
    pluralName: 'newsletter-subscribers';
    singularName: 'newsletter-subscriber';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::newsletter-subscriber.newsletter-subscriber'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    timing: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOrderItemOrderItem extends Struct.CollectionTypeSchema {
  collectionName: 'order_items';
  info: {
    description: 'Individual items in a customer order';
    displayName: 'Order Item';
    pluralName: 'order-items';
    singularName: 'order-item';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignedKeys: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.Enumeration<['INR', 'USD', 'EUR', 'GBP']> &
      Schema.Attribute.DefaultTo<'INR'>;
    deliveryStatus: Schema.Attribute.Enumeration<
      ['pending', 'delivered', 'failed']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::order-item.order-item'
    > &
      Schema.Attribute.Private;
    priceAtPurchase: Schema.Attribute.Integer & Schema.Attribute.Required;
    product: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    snapshot: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOrderOrder extends Struct.CollectionTypeSchema {
  collectionName: 'orders';
  info: {
    description: 'Orders placed by customers';
    displayName: 'Order';
    pluralName: 'orders';
    singularName: 'order';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignedKeys: Schema.Attribute.JSON;
    cartSnapshot: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.Enumeration<['INR', 'USD', 'EUR', 'GBP']> &
      Schema.Attribute.DefaultTo<'INR'>;
    deliveredAt: Schema.Attribute.DateTime;
    deliveryEmail: Schema.Attribute.Email;
    deliveryStatus: Schema.Attribute.Enumeration<
      ['pending', 'keys_assigned', 'delivered', 'failed']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    gameKeysAssigned: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::order.order'> &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    orderNumber: Schema.Attribute.String & Schema.Attribute.Unique;
    paymentMethod: Schema.Attribute.Enumeration<
      ['card', 'upi', 'paypal', 'wallet', 'cod']
    >;
    paymentProvider: Schema.Attribute.String;
    paymentStatus: Schema.Attribute.Enumeration<
      ['pending', 'paid', 'failed', 'refunded']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    publishedAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['processing', 'completed', 'cancelled', 'refunded']
    > &
      Schema.Attribute.DefaultTo<'processing'>;
    stripePaymentIntentId: Schema.Attribute.String;
    stripeSessionId: Schema.Attribute.String;
    totalAmount: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiPlayStationGiftCardPlayStationGiftCard
  extends Struct.CollectionTypeSchema {
  collectionName: 'play_station_gift_cards';
  info: {
    displayName: 'PlayStation Gift Card';
    pluralName: 'play-station-gift-cards';
    singularName: 'play-station-gift-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station-gift-card.play-station-gift-card'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiPlayStationPlayStation extends Struct.CollectionTypeSchema {
  collectionName: 'play_stations';
  info: {
    displayName: 'PlayStation';
    pluralName: 'play-stations';
    singularName: 'play-station';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    description: 'Collection for all video game products';
    displayName: 'Product';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    gameKeys: Schema.Attribute.Relation<'oneToMany', 'api::game-key.game-key'>;
    hideRecomend: Schema.Attribute.Boolean;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    isBestSeller: Schema.Attribute.Boolean;
    isGiftCard: Schema.Attribute.Boolean;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GAME'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    psn: Schema.Attribute.Boolean;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    stock_stetus: Schema.Attribute.Enumeration<['Availavle', 'Sold Out']>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiPromoBannerPromoBanner extends Struct.CollectionTypeSchema {
  collectionName: 'promo_banners';
  info: {
    displayName: 'Promo Banner';
    pluralName: 'promo-banners';
    singularName: 'promo-banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::promo-banner.promo-banner'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRazorpayRazorpay extends Struct.CollectionTypeSchema {
  collectionName: 'razorpays';
  info: {
    displayName: 'Razorpay';
    pluralName: 'razorpays';
    singularName: 'razorpay';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::razorpay.razorpay'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRobloxGiftCardRobloxGiftCard
  extends Struct.CollectionTypeSchema {
  collectionName: 'roblox_gift_cards';
  info: {
    displayName: 'Roblox Gift Card';
    pluralName: 'roblox-gift-cards';
    singularName: 'roblox-gift-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::roblox-gift-card.roblox-gift-card'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiSiteSite extends Struct.CollectionTypeSchema {
  collectionName: 'sites';
  info: {
    displayName: 'Site';
    pluralName: 'sites';
    singularName: 'site';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::site.site'> &
      Schema.Attribute.Private;
    maintenance_mode: Schema.Attribute.Boolean;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSpotifyGiftCardSpotifyGiftCard
  extends Struct.CollectionTypeSchema {
  collectionName: 'spotify_gift_cards';
  info: {
    displayName: 'Spotify Gift Card';
    pluralName: 'spotify-gift-cards';
    singularName: 'spotify-gift-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::spotify-gift-card.spotify-gift-card'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiSteamGiftCardSteamGiftCard
  extends Struct.CollectionTypeSchema {
  collectionName: 'steam_gift_cards';
  info: {
    displayName: 'Steam Gift Card';
    pluralName: 'steam-gift-cards';
    singularName: 'steam-gift-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::steam-gift-card.steam-gift-card'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface ApiStripeStripe extends Struct.CollectionTypeSchema {
  collectionName: 'stripes';
  info: {
    displayName: 'Stripe';
    pluralName: 'stripes';
    singularName: 'stripe';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::stripe.stripe'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiXboxGiftCardXboxGiftCard
  extends Struct.CollectionTypeSchema {
  collectionName: 'xbox_gift_cards';
  info: {
    displayName: 'Xbox Gift Card';
    pluralName: 'xbox-gift-cards';
    singularName: 'xbox-gift-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    age: Schema.Attribute.Media<'images'>;
    audio_language: Schema.Attribute.Component<
      'game-language.audio-language',
      false
    >;
    Available: Schema.Attribute.Boolean;
    card_region: Schema.Attribute.Enumeration<
      [
        'EUROPE',
        'UNITED STATES',
        'GLOBAL',
        'RUSSIA',
        'UNITED KINGDOM',
        'CHINA',
        'ROW (REST OF WORLD)',
        'LATIN AMERICA',
        'ASIA',
        'GERMANY',
        'AUSTRALIA',
        'BRAZIL',
        'INDIA',
        'JAPAN',
        'NORTH AMERICA',
        'POLAND',
        'TURKEY',
        'HONG KONG',
        'TAIWAN',
        'VIETNAM',
        'THAILAND',
        'SOUTH KOREA',
        'ARGENTINA',
        'CANADA',
        'DENMARK',
        'SWEDEN',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    descriptionkey: Schema.Attribute.RichText;
    developer: Schema.Attribute.String;
    discountPrice: Schema.Attribute.Decimal;
    editiondescription: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    game_tag_seo: Schema.Attribute.Component<'slug-seo-tag.tag', false>;
    image: Schema.Attribute.Media<'images'>;
    interface_language: Schema.Attribute.Component<
      'game-language.interface-language',
      false
    >;
    item: Schema.Attribute.Enumeration<['DIGITAL KEY']> &
      Schema.Attribute.DefaultTo<'DIGITAL KEY'>;
    item_type: Schema.Attribute.Enumeration<['GAME', 'GIFT CARD']> &
      Schema.Attribute.DefaultTo<'GIFT CARD'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::xbox-gift-card.xbox-gift-card'
    > &
      Schema.Attribute.Private;
    minimumRequirement: Schema.Attribute.Component<
      'game-requirements.minimum',
      false
    >;
    notice: Schema.Attribute.String;
    platform_image: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    recommendedRequirement: Schema.Attribute.Component<
      'game-requirements.recommended',
      false
    >;
    region: Schema.Attribute.Enumeration<
      [
        'Europe',
        'United states',
        'Global',
        'Russia',
        'United kingdom',
        'China',
        'Row (rest of world)',
        'Latin america',
        'Asia',
        'Germany',
        'Australia',
        'Brazil',
        'India',
        'Japan',
        'North America',
        'Poland',
        'Turkey',
        'Hong Kong',
        'Taiwan',
        'Vietnam',
        'Thailand',
        'South Korea',
        'Argentina',
        'Canada',
        'Denmark',
        'Sweden',
      ]
    >;
    relatedProducts: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-station.play-station'
    >;
    releaseDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    subtitles_language: Schema.Attribute.Component<
      'game-language.subtitles-language',
      false
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    var_title: Schema.Attribute.String;
    workPlatform: Schema.Attribute.Enumeration<
      ['Windows', 'Steam', 'Epic Game', 'Xbox', 'PlayStation']
    >;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::audit-log': AdminAuditLog;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::binance-gift-card.binance-gift-card': ApiBinanceGiftCardBinanceGiftCard;
      'api::category-banner.category-banner': ApiCategoryBannerCategoryBanner;
      'api::category.category': ApiCategoryCategory;
      'api::checkout.checkout': ApiCheckoutCheckout;
      'api::game-banner.game-banner': ApiGameBannerGameBanner;
      'api::game-key.game-key': ApiGameKeyGameKey;
      'api::gift-card-variation.gift-card-variation': ApiGiftCardVariationGiftCardVariation;
      'api::gift-card.gift-card': ApiGiftCardGiftCard;
      'api::hero-banner.hero-banner': ApiHeroBannerHeroBanner;
      'api::newsletter-subscriber.newsletter-subscriber': ApiNewsletterSubscriberNewsletterSubscriber;
      'api::order-item.order-item': ApiOrderItemOrderItem;
      'api::order.order': ApiOrderOrder;
      'api::play-station-gift-card.play-station-gift-card': ApiPlayStationGiftCardPlayStationGiftCard;
      'api::play-station.play-station': ApiPlayStationPlayStation;
      'api::product.product': ApiProductProduct;
      'api::promo-banner.promo-banner': ApiPromoBannerPromoBanner;
      'api::razorpay.razorpay': ApiRazorpayRazorpay;
      'api::roblox-gift-card.roblox-gift-card': ApiRobloxGiftCardRobloxGiftCard;
      'api::site.site': ApiSiteSite;
      'api::spotify-gift-card.spotify-gift-card': ApiSpotifyGiftCardSpotifyGiftCard;
      'api::steam-gift-card.steam-gift-card': ApiSteamGiftCardSteamGiftCard;
      'api::stripe.stripe': ApiStripeStripe;
      'api::xbox-gift-card.xbox-gift-card': ApiXboxGiftCardXboxGiftCard;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
