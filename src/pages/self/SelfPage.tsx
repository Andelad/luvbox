import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SelfPage.css';

const SelfPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking on a link in the menu
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="self-page" id="top">
      <div className={`self-side-menu ${menuOpen ? 'open' : ''}`}>
        {/* Hamburger menu button (only visible on mobile) */}
        <div 
          className={`hamburger-menu ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div className="side-menu-content">
          <div className="breadcrumb">
            <Link to="/map" onClick={handleLinkClick}>← Back to Map</Link>
          </div>
          <h3>In this section</h3>
          <ul>
            <li><a href="#intelligence-of-your-gut" onClick={handleLinkClick}>The Intelligence of Your Gut</a></li>
            <li><a href="#your-unique-perspective" onClick={handleLinkClick}>Your Unique Perspective</a></li>
            <li><a href="#intuition-and-expertise" onClick={handleLinkClick}>Intuition and Expertise: Partners, Not Opponents</a></li>
            <li><a href="#cost-of-choices" onClick={handleLinkClick}>The Cost of Choices</a></li>
            <li><a href="#educating-your-gut" onClick={handleLinkClick}>Educating Your Gut</a></li>
            <li><a href="#trusting-your-direction" onClick={handleLinkClick}>Trusting Your Direction</a></li>
            <li><a href="#living-partnership" onClick={handleLinkClick}>A Living Partnership</a></li>
          </ul>
          <div className="go-to-top">
            <a href="#top" onClick={handleLinkClick}>↑ Go to Top</a>
          </div>
        </div>
      </div>
      
      <div className="article-content">
        <div className="article-header">
          <h1>The Wisdom of Intuition: Why Your Gut Matters in Love</h1>
        </div>
        <div className="article-body">
          <p>
            In the complex landscape of relationships, we often find ourselves searching for clarity. Should I stay? Should I go? Is this person right for me? While tools like LuvBox can offer valuable insights, there's another instrument that deserves your attention—one that's been with you all along: your intuition.
          </p>
          <h2 id="intelligence-of-your-gut">The Intelligence of Your Gut</h2>
          <p>
            Your gut instinct isn't just a vague feeling or emotional reaction. It's a sophisticated information processing system that draws on your entire life experience. Research consistently shows that experts can make remarkably accurate intuitive decisions within their fields because their pattern recognition systems have been refined through experience.
          </p>
          <p>
            This means that as you navigate relationships, your intuitive responses are informed by everything you've learned about yourself, other people, and how connections work. Your gut feeling when meeting someone new or considering a relationship milestone isn't random—it's your mind processing countless subtle signals below your conscious awareness.
          </p>
          <h2 id="your-unique-perspective">Your Unique Perspective</h2>
          <p>
            You are the only person who has access to all the information that you do:
          </p>
          <ul>
            <li>Your personal history and experiences</li>
            <li>Your specific needs and desires</li>
            <li>Your observations about your relationship</li>
            <li>Your feelings that may be difficult to articulate</li>
            <li>The private moments between you and your partner</li>
          </ul>
          <p>
            No tool, friend, therapist, or family member can fully know what you know. This is why trusting your intuition is essential. You possess a viewpoint that is singularly yours, inclusive of all the nuances that others simply cannot see.
          </p>
          <h2 id="intuition-and-expertise">Intuition and Expertise: Partners, Not Opponents</h2>
          <p>
            The best decisions emerge when we unite our intuitive wisdom with thoughtful consideration. LuvBox isn't designed to override your gut feelings but to enter into dialogue with them.
          </p>
          <p>
            When using LuvBox, you might discover patterns worth exploring:
          </p>
          <ul>
            <li>Perhaps your dealbreaker line is unusually high due to past hurts or fears</li>
            <li>Maybe you're underinvesting in intimacy while overemphasizing other aspects</li>
            <li>Your goals might need clarification or reassessment</li>
          </ul>
          <p>
            The tool can highlight these possibilities, but only you can determine which insights resonate with your situation. The magic happens when you allow LuvBox's observations to engage with your intuition rather than replacing it.
          </p>
          <h2 id="cost-of-choices">The Cost of Choices</h2>
          <p>
            Every relationship configuration involves tradeoffs. If chemistry is your primary focus, you may sacrifice stability. If you prioritize financial security, you might compromise on passion. If you choose someone with problematic behaviors, you may face ongoing challenges.
          </p>
          <p>
            None of these choices are inherently wrong, but each carries consequences. The question isn't whether your preferences are valid—they are—but whether you're willing to accept the associated costs.
          </p>
          <ul>
            <li>Are you choosing based on genuine love or unmet needs?</li>
            <li>Is what you're sacrificing worth what you're gaining?</li>
            <li>Can you sustain this balance over time?</li>
          </ul>
          <p>
            These questions aren't easily answered by algorithms or checklists. They require honest self-reflection guided by your intuitive understanding.
          </p>
          <h2 id="educating-your-gut">Educating Your Gut</h2>
          <p>
            While your intuition is powerful, it can be refined and educated. The more intentional you are about relationships, the more sophisticated your gut reactions become. Consider:
          </p>
          <ul>
            <li>Reflecting on past relationships to identify patterns</li>
            <li>Seeking feedback from trusted friends who know you well</li>
            <li>Working with a counselor to understand your attachment style</li>
            <li>Reading diverse perspectives on relationships</li>
            <li>Practicing mindfulness to better distinguish between fear and intuition</li>
          </ul>
          <p>
            Think of LuvBox as a training ground for your intuition—a place to experiment with possibilities and refine your inner compass.
          </p>
          <h2 id="trusting-your-direction">Trusting Your Direction</h2>
          <p>
            As you engage with LuvBox, you'll encounter many potential areas for growth:
          </p>
          <ul>
            <li>You might wonder if pride is affecting your choices</li>
            <li>You could question if you're capable of loving "enough"</li>
            <li>You may consider if anxiety is clouding your judgment</li>
            <li>You might contemplate practical matters like location or finances</li>
          </ul>
          <p>
            We encourage you to trust your gut about where to start. You are the expert on your own journey. LuvBox offers a map of the terrain, but you determine the path forward.
          </p>
          <h2 id="living-partnership">A Living Partnership</h2>
          <p>
            Remember that LuvBox is not prescriptive. It doesn't tell you what you must change or improve. It simply illuminates possibilities and helps you understand the implications of different choices.
          </p>
          <p>
            Your relationship with yourself—your ability to listen to, trust, and refine your intuition—is perhaps the most important relationship you'll ever nurture. It's this relationship that will guide you through the beautiful complexity of connecting with others.
          </p>
          <p>
            Trust your gut. Educate it. And allow both your intuition and tools like LuvBox to work together in service of your authentic path to love.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfPage;