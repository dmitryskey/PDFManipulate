/**
 * Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbar =
	[
		{ name: 'document', items : [ 'Source', 'DocProps', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
		{ name: 'clipboard', items : [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'Scayt' ] },
		{ name: 'editing', items : [ 'Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat' ] },
                '/',
		{ name: 'basicstyles', items : [ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript' ] },
		{ name: 'paragraph', items : [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
		{ name: 'justify', items : [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyFull', 'JustifyBlock' ] },
		{ name: 'links', items: ['Link', 'Unlink', 'Anchor', '-', 'Table', 'HorizontalRule', 'SpecialChar', 'Image'] },
                '/',
		{ name: 'styles', items : [ 'Styles', 'Format', 'Font', 'FontSize'] },
		{ name: 'color', items : [ 'TextColor', 'BGColor'] },
                { name: 'forms', items: [ 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button' ] }
	];

	config.allowedContent = true;
};

