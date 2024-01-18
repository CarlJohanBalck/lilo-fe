var config = {};

config.pi_address = "http://localhost:5003"
config.pi_get_status = config.pi_address + "/Status"
config.lilo_fick = config.pi_address + "/LiloFick"
module.exports = config;