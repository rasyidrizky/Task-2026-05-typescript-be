import swaggerJSDoc, { type Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'REST API documentation'
        },
        servers: [{ url: 'http://localhost:5000' }],
        tags: [
            { name: 'Users', description: 'User management operations' },
            { name: 'Contacts', description: 'Contact management operations' }
        ],
        paths: {
            '/users': {
                get: {
                    tags: ['Users'],
                    summary: 'Return all users',
                    responses: {
                        '200': { description: 'OK' },
                        '500': { description: 'Internal server error' }
                    }
                },
                post: {
                    tags: ['Users'],
                    summary: 'Create a new user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        username: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': { description: 'Created' },
                        '400': { description: 'Invalid input' },
                        '500': { description: 'Internal server error' }
                    }
                }
            },
            '/users/{id}': {
                get: {
                    tags: ['Users'],
                    summary: 'Return a user by ID',
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
                    ],
                    responses: {
                        '200': { description: 'OK' },
                        '404': { description: 'User not found' }
                    }
                },
                put: {
                    tags: ['Users'],
                    summary: 'Update username by ID',
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: { username: { type: 'string' } }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': { description: 'OK' },
                        '400': { description: 'Invalid input' },
                        '404': { description: 'User not found' }
                    }
                },
                delete: {
                    tags: ['Users'],
                    summary: 'Delete user by ID',
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
                    ],
                    responses: {
                        '200': { description: 'OK' },
                        '404': { description: 'User not found' }
                    }
                }
            },

            '/users/{userId}/contacts': {
                post: {
                    tags: ['Users'],
                    summary: 'Add a new contact to a user',
                    parameters: [
                        { in: 'path', name: 'userId', required: true, schema: { type: 'integer' }, description: 'Owner User ID' }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        phone_number: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': { description: 'Created' },
                        '404': { description: 'User not found' }
                    }
                }
            },

            '/contacts/{id}': {
                put: {
                    tags: ['Contacts'],
                    summary: 'Update contact details',
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        phone_number: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': { description: 'OK' },
                        '404': { description: 'Contact not found' }
                    }
                },
                delete: {
                    tags: ['Contacts'],
                    summary: 'Delete contact by ID',
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
                    ],
                    responses: {
                        '200': { description: 'OK' },
                        '404': { description: 'Contact not found' }
                    }
                }
            }
        }
    },
    apis: [],
};

export default swaggerJSDoc(swaggerOptions);