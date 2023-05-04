module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Jenkin6972',
          name: 'electron',
          // authToken : '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'
        },
        authToken: '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',
        prerelease: false,
        draft: true,
      },
    },
  ],
};
