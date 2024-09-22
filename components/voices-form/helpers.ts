import { Audio } from "@/server/types";
import { VoiceFormData, VoiceFormDataBackup } from "@/types";
import dayjs from "dayjs";

function initializeData(features: string[], audios: Audio[]): VoiceFormData[] {
    const formBackup = JSON.parse(localStorage.getItem('voiceFormBackup') ?? '{}') as VoiceFormDataBackup
    let shouldRestore = false
    if (formBackup.timestamp && formBackup.features) {
        const currentTime = dayjs()
        const lastBackupTime = dayjs(formBackup.timestamp)
        if (currentTime.diff(lastBackupTime, 'hour') < 1) {
            shouldRestore = JSON.stringify(formBackup.features) === JSON.stringify(features)
        }
    }
    if (!shouldRestore) {
        return initializeDefaultData(features, audios)
    }
    return formBackup.backup
}

function initializeDefaultData(features: string[], audios: Audio[]): VoiceFormData[] {
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