const data = {
    host: 'localhost',
    port: 5000,
};

export default function server_data() {
    const ip = data.host;
    const { port } = data;

    return { ip, port };
}
