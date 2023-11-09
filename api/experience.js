import { experiences } from '../src/data/experience';
import ReactDOMServer from 'react-dom/server';

export default function handler(req, res) {
  // Convert JSX to static markup and replace the `description` field
  const experiencesWithStaticMarkup = experiences.map(experience => {
    return {
      ...experience,
      description: ReactDOMServer.renderToStaticMarkup(experience.description)
    };
  });

  res.status(200).json(experiencesWithStaticMarkup);
}