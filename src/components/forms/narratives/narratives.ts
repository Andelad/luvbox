export interface LoveNarrative {
    id: string;
    title: string;
    centralBelief: string;
    keyElements: string;
    signsOfLove: string;
    historicalRoots: string;
  }
  
  export const loveNarratives: LoveNarrative[] = [
    {
      id: "soulmate",
      title: "The Destined Partnership (\"Soulmate\" Narrative)",
      centralBelief: "There is one perfect match destined for each person",
      keyElements: "Instant recognition, overcoming obstacles, feeling of \"coming home\"",
      signsOfLove: "Uncanny connection, feeling complete with the other person",
      historicalRoots: "Plato's concept of divided souls seeking reunification; romantic era literature"
    },
    {
      id: "garden",
      title: "The Growth Journey (\"Garden\" Narrative)",
      centralBelief: "Love develops through effort, time, and mutual growth",
      keyElements: "Building compatibility, weathering challenges, creating shared history",
      signsOfLove: "Willingness to compromise, feeling secure even during difficulties",
      historicalRoots: "Traditional arranged marriages, companionate marriage ideals"
    },
    {
      id: "fire",
      title: "The Passionate Adventure (\"Fire\" Narrative)",
      centralBelief: "True love is marked by intensity, excitement, and desire",
      keyElements: "Chemistry, romantic gestures, emotional highs",
      signsOfLove: "Strong physical attraction, feeling alive and energized",
      historicalRoots: "Courtly love traditions, romantic literature, Hollywood romance"
    },
    {
      id: "team",
      title: "The Practical Partnership (\"Team\" Narrative)",
      centralBelief: "Love is built on shared goals, mutual support, and compatibility",
      keyElements: "Complementary strengths, problem-solving together, building a life",
      signsOfLove: "Feeling stronger together, admiration for partner's capabilities",
      historicalRoots: "Traditional marriage as economic unit, modern egalitarian partnerships"
    },
    {
      id: "sanctuary",
      title: "The Healing Bond (\"Sanctuary\" Narrative)",
      centralBelief: "Love provides safety, acceptance, and healing from past wounds",
      keyElements: "Emotional security, unconditional acceptance, being truly seen",
      signsOfLove: "Feeling safe to be vulnerable, acceptance of true self",
      historicalRoots: "Attachment theory, therapeutic culture of relationships"
    },
    {
      id: "sacred",
      title: "The Spiritual Connection (\"Sacred Union\" Narrative)",
      centralBelief: "Love transcends the physical and connects to something greater",
      keyElements: "Shared values, spiritual/ethical alignment, sense of purpose",
      signsOfLove: "Feeling elevated by the relationship, inspired to be better",
      historicalRoots: "Religious concepts of marriage, agape love, philosophical ideals of union"
    }
  ];
  
  // Create a type for user rankings
  export interface NarrativeRanking {
    narrativeId: string;
    rank: number;
  }
  
  // Create a helper function to get narratives in ranked order
  export const getRankedNarratives = (rankings: NarrativeRanking[]): LoveNarrative[] => {
    if (!rankings || rankings.length === 0) {
      return loveNarratives;
    }
    
    // Create a map of narrative IDs to their rankings
    const rankMap = new Map<string, number>();
    rankings.forEach(ranking => {
      rankMap.set(ranking.narrativeId, ranking.rank);
    });
    
    // Sort narratives based on their ranks
    return [...loveNarratives].sort((a, b) => {
      const rankA = rankMap.get(a.id) || 999; // Default high value if not ranked
      const rankB = rankMap.get(b.id) || 999;
      return rankA - rankB;
    });
  };