'use strict';

const { mockInfo, mockClose } = require('winston');
const handler = require('./handler');

const createEvent = data => ({ awslogs: { data } });

it('parses single log from CloudWatch', done => {
  const event = createEvent(
    'H4sIAAAAAAAAAGVQ20rDQBD9lbL42JC9X/IWNBZRsZrgSy2ym92WQG4maUsp/XenXkAQhnmYOWfmnHNCTRhHuw3FsQ8oQTdpkb4/ZnmeLjI0R92hDQOMsWYcC64YwwbGdbddDN2uh01sD2Nc28Z5G7swTPUx8mEf2b7/xuXTEGwDQIqJjjGUildXD2mR5cU6WEec2FjDuODOMe2C2FAfmBOc642HE+POjeVQ9VPVtbdVPYVhRMkK/XmV/0OkfR+RYknokj9f34vlE1p/acn2oZ0u9BOqPEhinGJK5KUEN4xJRYwmWmAsGTOSUqUNp0wRwTQRBkspuCRKgqypgtwm20AEsAWmMoZjZea/ecL5vEhfitlL+NgB9M4nM+m8N6VWkbHaRoQEHRmqbMShs1J6Ksty9goOwUky+wnprUXn9fkTqdHl/agBAAA=',
  );

  handler.log(event, {}, err => {
    expect(err).toBeNull();
    expect(mockInfo).toHaveBeenCalledWith(
      'START RequestId: 6bdd9c87-9a8a-11e8-927a-49273c6d26cc Version: $LATEST\n',
    );

    done();
  });
});

it('parses batched logs from CloudWatch', done => {
  const event = createEvent(
    'H4sIAAAAAAAAAL2WX2/bNhTFv4oh7DFq7iV5Sd68uYtXDFvWLHb30gSDaNGFATv2bKVdVvS77yjtUKe1HA1zB/gfSMr6nXsPD/W+WObttnqTJ/frXJwV58PJ8PeL0Xg8fDEqTorVu9u8wTBF60hcsJYUw4vVmxeb1d0aM6fVu+3polqmujpNedMs7ss6vy2r9frjunGzydUSCw1xPCW8wunr734eTkbjyU2uEieZVWqduJRsTFlmps42iXNxVuMvtndpO93M1818dfvDfNHkzbY4e13s3Gr81Yrhel3y5JLNpfv1+5/k8mVx88Ayeptvm/by98W8BpJ1hgwHY7TVJd4Fb5nZCVsWUlK1bFUjYx1p9D6GqMETsJo56tZUS5SAxVofIoCtxJN/6om/H/1yPrjKf9xh4Y/12SBUGpPEaalVTCVzjmWVK1NOg6WZmVE9ndbXt8WHk/9Gxz3prkaXL68m/xqwOb/bVG2pzwaOnhkeLLfXzfP5YpHrwecpJsLE4Lq5yMvV5n4wnv+V21HjBhfPMVr9Ofg082qbcevID+P75FuKjC9RCU6thCgYoEAB9wAYowyGbfRWMYUydMhXMmZX/ngy/EJ9olhP69mO+mSilKxT9iFVaZZk8Bvs9yDwk4M7gI0weUfOs/HqYwQkXsbZaLxINFgTfBC0DG3pBj7oph64R6BzPen2uKkP4I6b7DMx395MBhvBE0En3sF447yHs9QEsHFbAoVowieztZ29QXWeMFOAeB92xMdQ5VKl4qhRsE1TPzMBkLHHoZbbdjhvSCLM71jUhaCB1YuFGMREtF3RhFwwB830NO4R6Lqi6Uu6fWbqAfjITP5/MJOFU+BlFsHxRTYwNo6BFhYX2x8OMeUt2BhpbTp6I2QjPWGmOkyF0454TbWWpFxbbtW7WT8z2SgWp7gnIwGHCDZBGwLijAb1yjhq2p6ibUhWx6Eb2B8009O4R6CLPen2makH4ONkom9vJoDjQq+IVkgPxiGjo3gTlZBZrZEMjj39+BDmO3uj7A6baWo0zozsxnKOWvoUiMRrXfc1ExI0YlfD7fiigM2Ps8Mbq960vROPzqGheHAhYtfpfjzFHDJTD9wj0HUk01d0e8zUB/CRmZw7upluPvwNno+/2MgLAAA=',
  );

  handler.log(event, {}, err => {
    expect(err).toBeNull();
    expect(mockInfo).toHaveBeenCalledTimes(15);

    done();
  });
});
