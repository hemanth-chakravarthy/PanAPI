import Router from 'express';
import verifyPanSync from '../controllers/verifyPanSynccontroller';
import getPanStatus from '../controllers/getPanStatusController';
import bulkVerifyPan from '../controllers/bulkVerifyPanController';
import getBulkPanStatus from '../controllers/getBulkPanStatusController';
import verifyPanLite from '../controllers/verifyPanLiteController';
import verifyPan360 from '../controllers/verifyPan360Controller';

const router = Router();

router.route('/verify').post(verifyPanSync);
router.route('/status/:referenceId').get(getPanStatus);
router.route('/bulk-verify').post(bulkVerifyPan);
router.route('/bulk-status').get(getBulkPanStatus);
router.route('/pan-lite').post(verifyPanLite);
router.route('/pan-360').post(verifyPan360);

export default router;
