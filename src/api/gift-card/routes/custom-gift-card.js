'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/gift-cards/filters',
            handler: 'gift-card.getFilterOptions',
            config: {
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/gift-cards/counts',
            handler: 'gift-card.getCounts',
            config: {
                auth: false, // public access (important for frontend)
            },
        },
    ],
};