/* eslint-disable no-param-reassign */
import Trix from "trix";
import {dig} from "lib/object";

Trix.Attachment.previewablePattern = /^(image(\/(gif|png|jpe?g)|$)|video(\/(mpeg|mp4|quicktime)|$))/;
Trix.config.attachments.preview.caption.name = false;
Trix.config.attachments.preview.caption.size = false;

class PreviewableAttachmentView extends Trix.PreviewableAttachmentView {
  createContentNodes() {
    if(this.isVideo()) {
      this.preview = Trix.makeElement({
        attributes: {controls: "true"},
        childNodes: Trix.makeElement({
          attributes: {src: "", type: ""},
          data: {trixMutable: true},
          tagName: "source"
        }),
        data: {trixMutable: true},
        tagName: "video"
      });
    } else {
      this.preview = Trix.makeElement({
        attributes: {src: ""},
        data: {trixMutable: true},
        tagName: "img"
      });
    }

    this.refresh(this.preview);
    return [this.preview];
  }
  getContentType() {
    return dig(this.attachment, "attributes", "values", "contentType") || "";
  }
  isVideo() {
    return this.getContentType().startsWith("video");
  }
  refresh(preview) {
    if(!preview) {
      const element = this.findElement();
      preview = element && element.querySelector(this.isVideo() ? "video" : "img");
    }

    if(preview) { this.updateAttributesForPreview(preview); }
  }
  updateAttributesForImage(preview) {
    const url = this.attachment.getURL();
    const previewURL = this.attachment.getPreviewURL();
    preview.src = previewURL || url;

    if(previewURL === url) {
      preview.removeAttribute("data-trix-serialized-attributes");
    } else {
      const serializedAttributes = JSON.stringify({src: url});
      preview.setAttribute("data-trix-serialized-attributes", serializedAttributes);
    }

    const width = this.attachment.getWidth();
    const height = this.attachment.getHeight();

    if(width) { preview.width = width; }
    if(height) { preview.height = height; }

    const storeKey = ["previewElement", this.attachment.id, preview.src, preview.width, preview.height].join("/");
    preview.dataset.trixStoreKey = storeKey;
  }
  updateAttributesForPreview(preview) {
    this.isVideo()
      ? this.updateAttributesForVideo(preview)
      : this.updateAttributesForImage(preview);
  }
  updateAttributesForVideo(preview) {
    const url = this.attachment.getURL();
    const previewURL = this.attachment.getPreviewURL();
    const source = preview.querySelector("source");
    source.src = previewURL || url;

    if(previewURL === url) {
      source.removeAttribute("data-trix-serialized-attributes");
    } else {
      const serializedAttributes = JSON.stringify({src: url, type: source.type});
      source.setAttribute("data-trix-serialized-attributes", serializedAttributes);
    }

    const storeKey = ["previewElement", this.attachment.id, source.src].join("/");
    preview.dataset.trixStoreKey = storeKey;
  }
  attachmentDidChangeAttributes() {
    this.refresh(this.preview);
    this.refresh();
  }
}

Trix.PreviewableAttachmentView = PreviewableAttachmentView;

export default Trix;
