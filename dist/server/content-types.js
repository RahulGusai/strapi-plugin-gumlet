"use strict";
module.exports = {
    'api-video-asset': {
        schema: {
            kind: 'collectionType',
            collectionName: 'api_video_assets',
            info: {
                name: 'api-video-asset',
                singularName: 'api-video-asset',
                pluralName: 'api-video-assets',
                displayName: 'Gumlet Asset',
            },
            pluginOptions: {
                'content-manager': {
                    visible: false,
                },
                'content-type-builder': {
                    visible: true,
                },
            },
            options: {
                draftAndPublish: false,
                comment: '',
            },
            attributes: {
                title: {
                    type: 'string',
                    required: true,
                },
                description: {
                    type: 'string',
                    required: true,
                },
                videoId: {
                    type: 'string',
                    required: true,
                    maxLength: 255,
                },
                playbackUrl: {
                    type: 'string',
                    required: true,
                },
                thumbnail: {
                    type: 'string',
                    required: true,
                },
                tags: {
                    type: 'json',
                },
                metadata: {
                    type: 'json',
                },
            },
        },
    },
};
