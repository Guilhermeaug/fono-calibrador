import { Audio } from "@/server/types";
import { VoiceFormData } from "@/types";

function initializeData(features: string[], audios: Audio[]): VoiceFormData[] {
    return audios.map((voice) => ({
        identifier: voice.identifier,
        duration: 0,
        numberOfAudioClicks: 0,
        numberOfAttempts: 0,
        data: features.map((feature) => ({
            feature,
            value: 0
        }))
    }))
}

export { initializeData }