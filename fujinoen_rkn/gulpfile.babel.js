import lodash from 'lodash'
import gulp from 'gulp'
import babel from 'gulp-babel'
import ejs from 'gulp-ejs'
import crypto from 'crypto'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sassglob from 'gulp-sass-glob'
import cleancss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import imagemin from 'gulp-imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import pngquant from 'imagemin-pngquant'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'


const paths = {
	imageall: {
		src:[ 
			'./src/image/**/*.{jpg,jpeg,png,gif,svg}',
			'./src/images/**/*.{jpg,jpeg,png,gif,svg}',
			'./src/cms/wp-content/uploads/images/**/*.{jpg,jpeg,png,gif,svg}',
		]
	},
	image: {
		src:[
			'./src/image/**/*.{jpg,jpeg,png,gif,svg}',
			'!./src/image/**/_*.{jpg,jpeg,png,gif,svg}',
		],
		watch: [ 
			'./src/image/**/*.{jpg,jpeg,png,gif,svg}',
		],
		dist: './dist/image/',
	},
	images: {
		src:[
			'./src/images/**/*.{jpg,jpeg,png,gif,svg}',
			'!./src/images/**/_*.{jpg,jpeg,png,gif,svg}',
		],
		watch:[ 
		'./src/images/**/*.{jpg,jpeg,png,gif,svg}'
		],
		dist: './dist/images/',
	},
	cmsimages: {
		src:[
			'./src/cms/wp-content/uploads/images/**/*.{jpg,jpeg,png,gif,svg}',
			'!./src/cms/wp-content/uploads/images/**/*.{jpg,jpeg,png,gif,svg}',
		],
		watch:[ 
			'./src/cms/wp-content/uploads/images/**/*.{jpg,jpeg,png,gif,svg}'
		],
		dist: './dist/cms/wp-content/uploads/images/',
	},
	styles: {
		src: './src/css/**/*.scss',
		dist: './dist/',
	},
	scripts: {
		src: './src/js/**/*.{js,vue}',
		dist: './dist/js/',
		entry: {
			script: './src/js/script.js',
		},
	},
	ejses: {
		src: [
			'./src/**/*.ejs',
			'!./src/**/_*.ejs',
		],
		watch: [
			'./src/**/*.ejs'
		],
		dist: './dist/',
	},
	htmls: {
		src: [
			'./src/*.html',
			'./src/*/*.html',
		],
		dist: './dist/',
	},
	cache: {
		src: [
			'./dist/index.html',
			'./dist/**/*.html',
		],
		dist: './dist/',
	},
}

const image = () => {
	return gulp.src(paths.image.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(changed(paths.image.dist))
		.pipe(imagemin([
			pngquant({
				quality: [.7, .85],
			}),
			mozjpeg({
				quality: 85,
			}),
			imagemin.gifsicle(),
			imagemin.svgo(),
		]))
		.pipe(gulp.dest(paths.image.dist))
}
const images = () => {
	return gulp.src(paths.images.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(changed(paths.images.dist))
		.pipe(imagemin([
			pngquant({
				quality: [.7, .85],
			}),
			mozjpeg({
				quality: 85,
			}),
			imagemin.gifsicle(),
			imagemin.svgo(),
		]))
		.pipe(gulp.dest(paths.images.dist))
}
const cmsimages = () => {
	return gulp.src(paths.cmsimages.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(changed(paths.cmsimages.dist))
		.pipe(imagemin([
			pngquant({
				quality: [.7, .85],
			}),
			mozjpeg({
				quality: 85,
			}),
			imagemin.gifsicle(),
			imagemin.svgo(),
		]))
		.pipe(gulp.dest(paths.cmsimages.dist))
}

const styles = () => {
	return gulp.src(paths.styles.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sassglob())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		/*----------------------------------------------------------------------------------------------------
		 * [ Autoprefixer ]
		 * https://github.com/ai/browserslist#queries
		 * https://browserl.ist/?q=last+2+versions%2C+ie+%3E%3D+11%2C+Android+%3E%3D+4%2C+ios_saf+%3E%3D+8
		 ----------------------------------------------------------------------------------------------------*/
		.pipe(autoprefixer({
			overrideBrowserslist: [ 'last 2 versions', 'ie >= 11', 'Android >= 4', 'ios_saf >= 8' ],
			cascade: false,
		}))
//		.pipe(cleancss())
		.pipe(gulp.dest(paths.styles.dist))
}

const scripts = () => {
	return gulp.src(paths.scripts.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
//		.pipe(babel())
		.pipe(gulp.dest(paths.scripts.dist))
}

const ejses = () => {
	return gulp.src(paths.ejses.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(ejs({ _: lodash }))
		.pipe(rename({ extname: '.html' }))
		.pipe(gulp.dest(paths.ejses.dist))
}

const htmls = () => {
	return gulp.src(paths.htmls.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(gulp.dest(paths.htmls.dist))
}



const server = (done) => {
	browserSync.init({
		server: {
			baseDir: './dist/',
		},
	})
	done()
}

const reload = (done) => {
	browserSync.reload();
    done();
}

const watchFiles = (done) => {
	// gulp.watch(paths.imageall.src, gulp.series(image, images , cmsimages));
	gulp.watch(paths.image.watch, gulp.series(image, reload));
	gulp.watch(paths.images.watch, gulp.series(images, reload));
	gulp.watch(paths.cmsimages.watch, gulp.series(cmsimages, reload));
	gulp.watch(paths.styles.src).on('change', gulp.series(styles, browserSync.reload))
	gulp.watch(paths.scripts.src).on('change', gulp.series(scripts, browserSync.reload))
	gulp.watch(paths.ejses.watch).on('change', gulp.series(ejses, browserSync.reload))
	gulp.watch(paths.htmls.src).on('change', gulp.series(htmls, browserSync.reload))
}

const build = gulp.parallel(image,images,cmsimages, styles, scripts, ejses, htmls,)
const watch = gulp.series(build, gulp.series(server, watchFiles))

module.exports = {
	image: image,
	images: images,
	cmsimages: cmsimages,
	styles: styles,
	scripts: scripts,
	ejses: ejses,
	htmls: htmls,
	build: build,
	watch: watch,
	default: watch,
}
