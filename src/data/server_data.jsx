const data = {
    host: '10.76.18.176',
    port: 5000,
};

export default function server_data() {
    const ip = data.host;
    const { port } = data;

    return { ip, port };
}
