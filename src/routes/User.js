import app from '../../app';
import { Agent } from 'http';

const agent = new Agent();

const host =  agent.getName(app).then(host => host.slice(0, host.length));
export default function routes(req, res) {
  console.log(host);
}