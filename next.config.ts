// @ts-check
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

export default (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    assetPrefix: isDev ? undefined : 'https://inari6735.github.io/ravedron',
  }
  return nextConfig
}
