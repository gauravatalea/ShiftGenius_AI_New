<?php

/**
 * ShiftGenius AI - Custom MVC PHP Framework Entry Point
 * 
 * This file serves as the main entry point for the ShiftGenius AI scheduling system.
 * It initializes the custom MVC framework and handles all incoming requests.
 */

require_once __DIR__ . '/core/Application.php';
require_once __DIR__ . '/config/app.php';

try {
    // Initialize the application
    $app = new Application();
    
    // Load configuration
    $app->loadConfig();
    
    // Register middleware
    $app->addMiddleware(new CorsMiddleware());
    $app->addMiddleware(new JsonMiddleware());
    
    // Load routes
    require_once __DIR__ . '/routes/api.php';
    
    // Handle the request
    $app->run();
    
} catch (Exception $e) {
    // Log the error
    error_log("Application Error: " . $e->getMessage());
    
    // Return JSON error response
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal Server Error',
        'message' => 'An unexpected error occurred'
    ]);
}
