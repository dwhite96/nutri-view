Rails.application.config.middleware.insert_before 0, Rack::Cors,
  debug: true,
  logger: (-> { Rails.logger }) do
  allow do
    origins 'localhost:3035'
    resource '*',
      headers: %w(Authorization),
      methods: :any,
      credentials: true,
      expose: %w(Authorization),
      max_age: 600
  end
end
