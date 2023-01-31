import { NextApiHandler, NextApiRequest } from "next";
import { prisma } from "../../../lib/prisma";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import store from "../data/store";

export const config = {
    api: {
        bodyParser: false,
    },
}

const updateStore = async (fields: any) => {
    console.log(fields);

    await prisma.store.update({
        where: {
            id: fields.storeID[0]
        },
        data: {
            name: fields.storeName[0],
            address: fields.storeAddress[0],
            delivery_fee: Number(fields.storeDF[0])
        }
    })
}

const readFile = (req: NextApiRequest, saveLocally?: boolean): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), "/public/images/store/");

    const form = formidable(options);
    return new Promise((resolve, reject) => {
        let storeID = ''
        form.on('field', (field, value) => {
            if (field === 'storeID')
                storeID = value
        })
        form.on('file', (formName, file) => {
            fs.rename(file.filepath, options.uploadDir + storeID + '.jpg')
        })
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            updateStore(fields)
            resolve({ fields, files });
        });
    });
};

const Handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await fs.readdir(path.join(process.cwd() + "/public", "/images", "/store"));
        } catch (error) {
            await fs.mkdir(path.join(process.cwd() + "/public", "/images", "/store"));
        }
        await readFile(req, true);
        res.json({ done: "ok" });
    }
}
export default Handler