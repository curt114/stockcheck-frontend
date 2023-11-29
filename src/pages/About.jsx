// =========================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =========================================================

import PageTitle from '../components/PageTitle';
import curt from '../assets/curt.png';
import Biography from '../components/Biography';
import Technologies from '../components/Technologies';
import HtmlIcon from '../components/icons/HtmlIcon';
import CssIcon from '../components/icons/CssIcon';
import JavascriptIcon from '../components/icons/JavascriptIcon';
import ReactIcon from '../components/icons/ReactIcon';
import PythonIcon from '../components/icons/PythonIcon';

export default function About() {
  return (
    <section className="container mx-auto px-3 py-9 md:py-14">
      <PageTitle>about me</PageTitle>

      <Biography>
        <Biography.Picture image={curt} />
        <Biography.Background>
          <Biography.Name name="Curt Lebensorger" />
          <Biography.Title>Software Engineer</Biography.Title>
          <Biography.Description>
            My programming journey began in 2014, because I wanted to bring
            people&#39;s vision and ideas to life. This is the main reason why I
            continue coding today. It brings me great satisfaction and pride
            when I create a tool that will make the lives of others easier.
            Thank you for taking the time to view my work, and please check out
            my LinkedIn profile if you wish to learn more about me. The source
            code for this project will be available through my GitHub account.
          </Biography.Description>
          <Biography.Links />
        </Biography.Background>
      </Biography>

      <Technologies>
        <Technologies.Title>Tech Stack</Technologies.Title>
        <Technologies.Skills>
          <HtmlIcon />
          <CssIcon />
          <JavascriptIcon />
          <ReactIcon />
          <PythonIcon />
        </Technologies.Skills>
      </Technologies>
    </section>
  );
}
