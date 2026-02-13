export interface CustomizeData {
  name: string
  greetingText: string
  wishText: string
  imagePath: string
}

export const defaultCustomizeData: CustomizeData = {
  name: "Vijju Kutty",
  greetingText: "Happy Valentine's Day My Darling!",
  wishText: "You are the most beautiful part of my life, and every day with you feels special. Your smile makes my world brighter, and your love gives me strength and happiness. I’m so thankful to have you by my side, today and always. I promise to cherish you, support you, and love you more with each passing day. 💕",
  imagePath: "/img/img.jpg"
}

export async function getCustomizeData(): Promise<CustomizeData> {
  try {
    const response = await fetch('/customize.json')
    if (!response.ok) {
      return defaultCustomizeData
    }
    const data = await response.json()
    return {
      name: data.name || defaultCustomizeData.name,
      greetingText: data.greetingText || defaultCustomizeData.greetingText,
      wishText: data.wishText || defaultCustomizeData.wishText,
      imagePath: data.imagePath || defaultCustomizeData.imagePath,
    }
  } catch (error) {
    console.error('Error loading customize.json:', error)
    return defaultCustomizeData
  }
}
