
const fs = require('fs');
const axios = require('axios');

let slackPayload = function (testEnv = 'stage') {
    let results
    try {
        results = JSON.parse(fs.readFileSync('results.json').toString());
    } catch (err) {
        throw new Error(err.message)

    }

    //console.log(results)
    let passed = 0
    let failed = 0
    let skipped = 0
    const body = {
        blocks: [
            {
                type: 'divider',
            },
            {
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: `:rocket: 🎭 *Playwright Tests: ${testEnv}!* :muscle:\n\n*Pipeline URL*: https://orhndmrc.github.io/playwright-js/\n\n`,
                    },
                ],
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*Here are the Results:* :point_down:',
                },
            },
            {
                type: 'divider',
            },
        ],
    };
    results.suites.forEach((suite) => {
        // const { title } = suite.specs[0];
        // console.log(suite)
        for (let spec of suite.specs) {
            const state = spec.tests[0].expectedStatus;
            if (state == 'skipped') {
                body.blocks.push({
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `⏩ *"${spec.title}"* is skipped`,
                    },
                });
                skipped++
            } else if (spec.ok) {
                body.blocks.push({
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `✅ *"${spec.title}"* passed!`,
                    },
                });
                passed++
            } else {
                body.blocks.push({
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `❌ *"${spec.title}"* failed!`,
                    },
                });
                failed++
            }

        }


    });
    body.blocks.push({ type: 'divider' });
    body.blocks.push({
        type: 'section',
        text: { type: 'mrkdwn', text: `:checkered_flag:*Total - Passed:grin:: ${passed}, Failed😭: ${failed}, Skipped:face_with_monocle:: ${skipped}*` }
    })
    body.blocks.push({ type: 'divider' });
    return body;
};
//console.log(slackPayload())
const config = {
    url: 'https://hooks.slack.com/services/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',
    method: 'post',
    data: slackPayload(),
};
axios(config).catch((e) => console.log('Slack Api Error -> ', e.message));
